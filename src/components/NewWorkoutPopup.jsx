import { useState } from "react";
import { FaArrowLeft, FaPlusCircle } from "react-icons/fa";
import ExerciseSearchModal from "./ExerciseSearchModal";
import ExerciseCard from "./ExerciseCard";
import WorkoutExerciseCard from "../components/WorkoutExerciseCard";

export default function NewWorkoutPopup({ onClose, onSave }) {
  const [hasChanges, setHasChanges] = useState(false);
  const [showSearchExerciseModal, setShowSearchExerciseModal] = useState(false);
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [title, setTitle] = useState("");
  const [muscles, setMuscles] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [showMuscleModal, setShowMuscleFilter] = useState(false);
  const [selectedMuscle, setSelectedMuscle] = useState("");

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
    <div className="fixed inset-0 z-50 bg-white flex flex-col w-full">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-4 relative pt-4 px-4">
        <button
          onClick={closeAndDiscard}
          className="text-gray-700 hover:text-black transition"
        >
          <FaArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-semibold text-center">New Workout</h2>
        <div></div>
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
              className="w-full border-b border-b-gray-700 px-2 py-1 text-sm "
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Display current muscles */}

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
        <div className="flex flex-col gap-3 mb-4 w-full">
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
                  className="px-4 py-1 text-sm bg-gray-200 rounded-md"
                  onClick={() => {
                    setShowMuscleFilter(false);
                    setSelectedMuscle("");
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-1 text-sm bg-red-500 text-white rounded-md"
                  onClick={() => {
                    if (selectedMuscle && !muscles.includes(selectedMuscle)) {
                      setMuscles([...muscles, selectedMuscle]);
                      setHasChanges(true);
                    }
                    setSelectedMuscle("");
                    setShowMuscleFilter(false);
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showSearchExerciseModal && (
        <ExerciseSearchModal
          onClose={() => setShowSearchExerciseModal(false)}
          onSelect={onSelectExercise}
        />
      )}

      {showWarning && (
        <div className="fixed inset-0 backdrop-brightness-90 backdrop-blur-[1px] flex justify-center items-center z-50 px-16">
          <div className="bg-white rounded-lg shadow-lg p-6 w-fit text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure?
            </h2>

            <div className="flex justify-between gap-4">
              <button
                onClick={onClose}
                className="bg-red-500 text-white px-4 py-2 rounded-md font-medium hover:bg-red-600 w-full"
              >
                QUIT
              </button>
              <button
                onClick={() => setShowWarning(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-400 w-full"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
