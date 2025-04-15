import { useContext, useState } from "react";
import AppContext from "../AppContext";
import NewWorkoutPopup from "../components/NewWorkoutPopup";

export default function WorkoutScreen() {
  const { workouts, loading } = useContext(AppContext);
  const [showPopup, setShowPopup] = useState(false);

  if (loading || !workouts) return <div>loading</div>;

  return (
    <div className="flex flex-col items-center px-4 py-6 min-h-screen bg-gray-50 relative">
      <div className="text-2xl font-bold text-gray-600 mb-6">your workouts</div>

      <div className="w-full max-w-md flex flex-col gap-4 mb-6">
        {workouts.map((el, index) => (
          <div key={index}>workout {index}</div>
        ))}
      </div>

      <button
        onClick={() => setShowPopup(true)}
        className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-blue-600 transition duration-200 cursor-pointer"
      >
        + New Workout
      </button>

      {showPopup && <NewWorkoutPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}
