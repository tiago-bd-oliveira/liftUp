import { useState, useEffect, useContext } from "react";
import AppContext from "../AppContext";
import { FaArrowLeft, FaPlusCircle } from "react-icons/fa";
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
  const [showMuscleModal, setShowMuscleFilter] = useState(false);
  const [selectedMuscle, setSelectedMuscle] = useState("");  const [showWarning, setShowWarning] = useState(false);
  const { workouts, setWorkouts, currentUser } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [muscles, setMuscles] = useState([]);
  const { workout } = location.state || {};

  const availableMuscles = [
    "chest",
    "back",
    "biceps",
    "triceps",
    "shoulders",
    "glutes",
    "calves",
    "core",
    "forearms",
    "quadriceps",
    "hamstrings",
  ];

  useEffect(() => {
    if (workout) {
      setWorkoutExercises(workout.exercises || []);
      setTitle(workout.name || "");
      setMuscles(workout.muscles || []);
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

  const removeExercise = (indexToRemove) => {
    setWorkoutExercises((prev) =>
      prev.filter((_, idx) => idx !== indexToRemove)
    );
    setHasChanges(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="w-full flex items-center justify-around align-middle mb-4 relative px-6 py-4 bg-white border-b-gray-800 border-b-2">
        <button
          onClick={closeAndDiscard}
          className=" p-2 text-gray-700 hover:text-black transition"
        >
          <FaArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-semibold text-center w-full text-wrap">
          {title || "Edit Workout"}
        </h2>
        <div></div>
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
            <span className="text-sm font-medium text-gray-700">Muscles:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {muscles.map((muscle, idx) => (
                <span
                  key={idx}
                  className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full"
                >
                  {muscle}
                </span>
              ))}
            </div>
            <button
              className="w-4 h-4 flex items-center justify-center rounded-full text-red-600 cursor-pointer"
              onClick={() => setShowMuscleFilter(true)}
            >
              <FaPlusCircle size={20} />
            </button>
          </div>
        </div>

        {/* Exercise List */}
        <div className="flex flex-col gap-3 mb-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Selected Exercises:
          </h3>
          {workoutExercises.length > 0 ? (
            workoutExercises.map((exercise, index) => (
              <WorkoutExerciseCard
                exercise={exercise}
                key={index}
                index={index}
                onUpdateSets={updateExerciseSets}
                onRemoveExercise={removeExercise}
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

      {showMuscleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-90 px-4">
          <div className="bg-white rounded-lg p-4 w-80 shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              Select Muscle Group
            </h3>

            <select
              value={selectedMuscle}
              onChange={(e) => setSelectedMuscle(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 text-sm"
            >
              <option value="">-- Select Muscle --</option>
              {availableMuscles.map((muscle, idx) => (
                <option key={idx} value={muscle}>
                  {muscle}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-1 text-sm bg-gray-200 text-gray-700 rounded-md font-bold"
                onClick={() => {
                  setShowMuscleFilter(false);
                  setSelectedMuscle("");
                }}
              >
                CANCEL
              </button>
              <button
                className="px-4 py-1 text-sm bg-red-500 text-white rounded-md font-bold"
                onClick={() => {
                  if (selectedMuscle && !muscles.includes(selectedMuscle)) {
                    setMuscles([...muscles, selectedMuscle]);
                    setHasChanges(true);
                  }
                  setSelectedMuscle("");
                  setShowMuscleFilter(false);
                }}
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      )}

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
