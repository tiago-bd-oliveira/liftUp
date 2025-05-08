import { useContext, useState } from "react";
import AppContext from "../AppContext";
import NewWorkoutPopup from "../components/NewWorkoutPopup";
import WorkoutCard from "../components/WorkoutCard";
import { db } from "../firebase";
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";

export default function WorkoutScreen() {
  const { workouts, setWorkouts, loading, currentUser } = useContext(AppContext);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const saveWorkout = async (workout) => {
    if (!currentUser) return;
  
    try {
      const docRef = await addDoc(collection(db, "workouts"), {
        ...workout,
        userId: currentUser.uid,
        timestamp: Date.now(),
        count: 0,
      });
  
      await setDoc(docRef, { id: docRef.id }, { merge: true });
  
      const newWorkout = { ...workout, id: docRef.id };
      setWorkouts([...workouts, newWorkout]);
      setShowPopup(false);
  
      console.log("Workout saved successfully!");
    } catch (error) {
      console.error("Error saving workout:", error);
    }
  };

  const deleteWorkout = async (workoutToDelete) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${workoutToDelete.name}"?`);
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "workouts", workoutToDelete.id));
      const updated = workouts.filter((w) => w.id !== workoutToDelete.id);
      setWorkouts(updated);
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  const selectWorkout = (workout) => {
    setSelectedWorkout(selectedWorkout === workout ? null : workout);
  };

  if (loading || !workouts) return <div>loading</div>;

  return (
    <div className="flex flex-col items-center px-4 pb-6 pt-4 ">
      <div className="text-2xl font-bold text-black mb-6">Your Workouts</div>

      <div className="w-full max-w-md flex flex-col gap-4 pb-4">
      {workouts.map((workout, index) => (
        <WorkoutCard
          key={workout.id || index} // Use the UUID as the key
          workout={workout}
          isSelected={selectedWorkout === workout}
          onSelect={selectWorkout}
          onDelete={() => deleteWorkout(workout)}
        />
      ))}
      </div>

      <button
        onClick={() => setShowPopup(true)}
        className="bg-red-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-200 cursor-pointer"
      >
        + New Workout
      </button>

      {showPopup && (
        <NewWorkoutPopup
          onClose={() => setShowPopup(false)}
          onSave={saveWorkout}
        />
      )}
    </div>
  );
}
