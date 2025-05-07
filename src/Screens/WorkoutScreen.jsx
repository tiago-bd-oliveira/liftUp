import { useContext, useState } from "react";
import AppContext from "../AppContext";
import NewWorkoutPopup from "../components/NewWorkoutPopup";
import WorkoutCard from "../components/WorkoutCard";

export default function WorkoutScreen() {
  const { workouts, setWorkouts, loading } = useContext(AppContext);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const saveWorkout = (workout) => {
    setWorkouts([...workouts, workout]);
    console.log(workouts);
  };

  const selectWorkout = (workout) => {
    if (workout == selectedWorkout) {
      setSelectedWorkout(null);
    } else {
      setSelectedWorkout(workout);
    }
  };

  if (loading || !workouts) return <div>loading</div>;

  return (
    <div className="flex flex-col items-center px-4 pb-6 pt-4 ">
      <div className="text-2xl font-bold text-black mb-6">Your Workouts</div>
      <div className="w-full max-w-md flex flex-col gap-4 pb-4">
        {workouts.map((workout, index) => (
          <WorkoutCard
            workout={workout}
            key={index}
            isSelected={selectedWorkout == workout}
            onSelect={selectWorkout}
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
