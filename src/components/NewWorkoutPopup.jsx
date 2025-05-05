import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import ExerciseSearchModal from "./ExerciseSearchModal";
import ExerciseCard from "./ExerciseCard";

export default function NewWorkoutPopup({ onClose, onSave }) {
  const [hasChanges, setHasChanges] = useState(false);
  const [showSearchExerciseModal, setShowSearchExerciseModal] = useState(false);
  const [workoutExercises, setWorkoutExercises] = useState([]);

  const closeAndDiscard = () => {
    if (hasChanges) {
      console.log("discard changes before closing");
    } else {
      onClose();
    }
  };

  const onSelectExercise = (exercise) => {
    setWorkoutExercises([...workoutExercises, exercise]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center align-middle justify-start p-6 pt-4 overflow-auto">
      {/* Header */}
      <div className="w-full flex items-center justify-center mb-6 relative">
        <button
          onClick={closeAndDiscard}
          className="absolute left-0 p-2 text-gray-700 hover:text-black transition"
        >
          <FaArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-semibold text-center">New Workout</h2>
      </div>

      {/* Inputs */}
      <div className="w-full max-w-md flex flex-col gap-3 mb-6">
        {/* Title input (compact) */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Title:
          </label>
          <input
            type="text"
            placeholder="e.g., Upper Body"
            className="flex-1 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Muscle groups input (compact) */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Muscles:
          </label>
          <input
            type="text"
            placeholder="e.g., Chest, Triceps"
            className="flex-1 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* New Exercise button */}
      <button
        className="mt-2 w-fit px-3 py-1.5 bg-red-500 text-white rounded-md text-sm hover:bg-blue-700 transition"
        onClick={() => setShowSearchExerciseModal(true)}
      >
        + New Exercise
      </button>

      {/* Spacer */}
      <div className="h-20" />

      <div>
        {workoutExercises?.map((el, index) => (
          <ExerciseCard exercise={el} key={index} />
        ))}
      </div>

      {/* Save Workout button */}
      <div className="fixed bottom-0 left-0 w-full px-6 py-4 flex gap-2">
        <button
          className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-medium text-lg hover:bg-green-700 transition"
          onClick={closeAndDiscard}
        >
          CANCEL
        </button>
        <button
          className="w-full bg-red-500 text-white py-3 rounded-xl font-medium text-lg hover:bg-green-700 transition"
          onClick={onSave}
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
    </div>
  );
}
