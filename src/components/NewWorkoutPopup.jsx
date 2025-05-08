import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import ExerciseSearchModal from "./ExerciseSearchModal";
import ExerciseCard from "./ExerciseCard";
import WorkoutExerciseCard from "../components/WorkoutExerciseCard";

export default function NewWorkoutPopup({ onClose, onSave }) {
  const [hasChanges, setHasChanges] = useState(false);
  const [showSearchExerciseModal, setShowSearchExerciseModal] = useState(false);
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [title, setTitle] = useState("");
  const [muscles, setMuscles] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const workout = {
    name: title,
    muscles: muscles,
    exercises: workoutExercises,
  };

  const closeAndDiscard = () => {
    if (hasChanges) {
      setShowWarning(true);
    } else {
      onClose();
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
          New Workout
        </h2>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-auto px-6 flex flex-col align-middle items-center">
        {/* Inputs */}
        <div className="w-full max-w-md flex flex-col gap-3 mb-6">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Title:
            </label>
            <input
              type="text"
              placeholder="e.g., Upper Body"
              className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Muscles:
            </label>
            <input
              type="text"
              placeholder="e.g., Chest, Triceps"
              className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Exercise List */}
        <div className="flex flex-col gap-3 mb-4">
          {workoutExercises?.map((el, index) => (
            <WorkoutExerciseCard
              exercise={el}
              key={index}
              index={index}
              onUpdateSets={updateExerciseSets}
            />
          ))}
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
          onClick={() => {
            onSave(workout);
            onClose();
          }}
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
