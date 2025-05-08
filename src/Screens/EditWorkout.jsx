import { useState, useEffect, useContext } from "react";
import AppContext from "../AppContext";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import ExerciseSearchModal from "../components/ExerciseSearchModal";
import WorkoutExerciseCard from "../components/WorkoutExerciseCard";
import { db } from "../firebase";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";


export default function NewWorkoutPopup() {
  const [hasChanges, setHasChanges] = useState(false);
  const [showSearchExerciseModal, setShowSearchExerciseModal] = useState(false);
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [title, setTitle] = useState("");
  const [muscles, setMuscles] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const { workouts, setWorkouts, currentUser } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { workout } = location.state || {};

  useEffect(() => {
    if (workout) {
      setWorkoutExercises(workout.exercises || []);
      setTitle(workout.name || "");
      setMuscles(workout.muscles || "");
    }
  }, [workout]);

  const saveWorkout = async (workout) => {
    const updatedWorkout = {
      ...workout,
      userId: currentUser.uid,
      timestamp: Date.now(),
    };
  
    try {
      if (workout.id) {
        const workoutRef = doc(db, "workouts", workout.id);
        await setDoc(workoutRef, updatedWorkout);
        setWorkouts((prevWorkouts) =>
          prevWorkouts.map((w) => (w.id === workout.id ? updatedWorkout : w))
        );
        console.log("Workout updated successfully!");
      } else {
        const docRef = await addDoc(collection(db, "workouts"), {
          ...updatedWorkout,
          id: undefined,
        });
        const newWorkout = { ...updatedWorkout, id: docRef.id };
        setWorkouts([...workouts, newWorkout]);
        console.log("New workout created successfully!");
      }
  
      navigate("/");
    } catch (error) {
      console.error("Error saving workout:", error);
      alert("Failed to save workout. Please try again.");
    }
  };

  const closeAndDiscard = () => {
    if (hasChanges) {
      setShowWarning(true);
    } else {
      navigate("/");
    }
  };

  const onSelectExercise = (exercise) => {
    setWorkoutExercises([...workoutExercises, exercise]);
    setHasChanges(true);
  };

  const updateExerciseSets = (indexToUpdate, newSets) => {
    setWorkoutExercises((prev) =>
      prev.map((ex, idx) =>
        idx === indexToUpdate ? { ...ex, sets: newSets } : ex
      )
    );
    setHasChanges(true);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    setHasChanges(true); // Mark changes as made
  };
  
  const onChangeMuscles = (e) => {
    setMuscles(e.target.value);
    setHasChanges(true); // Mark changes as made
  };
  

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header */}
      <div className="w-full flex items-center justify-center mb-4 relative px-6 pt-4">
        <button
          onClick={closeAndDiscard}
          className="absolute left-6 p-2 text-gray-700 hover:text-black transition"
        >
          <FaArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-semibold text-center w-full">
          {title || "Edit Workout"}
        </h2>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-auto px-6 flex flex-col align-middle items-center">
        {/* Inputs */}
        <div className="w-full max-w-md flex flex-col gap-3 mb-6">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Change title:
            </label>
            <input
              type="text"
              value={title}
              className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={onChangeTitle}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Muscles:
            </label>
            <input
              type="text"
              value={muscles}
              className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={onChangeMuscles}
            />
          </div>
        </div>

        {/* Exercise List */}
        <div className="flex flex-col gap-3 mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Selected Exercises:</h3>
          {workoutExercises.length > 0 ? (
            workoutExercises.map((exercise, index) => (
              <WorkoutExerciseCard
                exercise={exercise}
                key={index}
                index={index}
                onUpdateSets={updateExerciseSets}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">No exercises selected yet.</p>
          )}
        </div>

        {/* + New Exercise Button */}
        <button
          className="w-fit px-3 py-1.5 bg-red-500 text-white rounded-md text-sm hover:bg-blue-700 transition mb-8"
          onClick={() => setShowSearchExerciseModal(true)}
        >
          + New Exercise
        </button>
      </div>

      {/* Save Workout Button */}
      <div className="px-6 py-4 flex gap-2 border-t bg-white">
        <button
          className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-medium text-lg hover:bg-green-700 transition"
          onClick={closeAndDiscard}
        >
          CANCEL
        </button>
        <button
          className="w-full bg-red-500 text-white py-3 rounded-xl font-medium text-lg hover:bg-green-700 transition"
          onClick={() =>
            saveWorkout({
              id: workout?.id, // Pass the existing workout ID if it exists
              name: title,
              muscles: muscles,
              exercises: workoutExercises,
            })
          }
        >
          SAVE
        </button>
      </div>

      {showSearchExerciseModal && (
        <ExerciseSearchModal
          onClose={() => setShowSearchExerciseModal(false)}
          onSelect={onSelectExercise}
        />
      )}

      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Unsaved Changes</h2>
            <p className="text-sm text-gray-600 mb-6">
              You have unsaved changes. Are you sure you want to discard them?
            </p>
            <div className="flex gap-4">
              <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
                onClick={() => setShowWarning(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => navigate("/")} 
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}