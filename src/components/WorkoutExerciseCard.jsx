import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

export default function WorkoutExerciseCard({
  exercise,
  index,
  onUpdateSets,
  onRemoveExercise,
}) {
  const [sets, setSets] = useState(exercise.sets || []);
  const imageUrl = exercise.images?.[0];

  const handleSetChange = (setIndex, field, value) => {
    const numericValue = Math.max(0, Number(value)); // Prevent negative
    const updatedSets = sets.map((set, i) =>
      i === setIndex ? { ...set, [field]: numericValue } : set
    );
    setSets(updatedSets);
    onUpdateSets?.(index, updatedSets);
  };

  const addSet = () => {
    const lastSet = sets[sets.length - 1] || { weight: 0, reps: 0 };
    const updatedSets = [
      ...sets,
      { weight: lastSet.weight, reps: lastSet.reps },
    ];
    setSets(updatedSets);
    onUpdateSets?.(index, updatedSets);
  };

  const deleteSet = (setIndex) => {
    const updatedSets = sets.filter((_, i) => i !== setIndex);
    setSets(updatedSets);
    onUpdateSets?.(index, updatedSets);
  };

  const SetCard = ({ set, setIndex }) => {
    return (
      <div className="flex items-center justify-between gap-3 px-3 py-2 border rounded-md bg-gray-50 w-full">
        <span className="text-sm text-gray-700">{setIndex + 1}</span>

        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            className="w-12.5 px-2 py-1 border border-gray-300 rounded text-sm"
            value={set.reps}
            onChange={(e) => handleSetChange(setIndex, "reps", e.target.value)}
            placeholder="Reps"
          />
          <span className="text-sm text-gray-500">×</span>
          <input
            type="number"
            min="0"
            className="w-12.5 px-2 py-1 border border-gray-300 rounded text-sm"
            value={set.weight}
            onChange={(e) =>
              handleSetChange(setIndex, "weight", e.target.value)
            }
            placeholder="Weight"
          />
          <span className="text-sm text-gray-500">kg</span>
        </div>
        <button
          onClick={() => deleteSet(setIndex)}
          className="text-red-500 text-xs"
        >
          <FaTrashAlt />
        </button>
      </div>
    );
  };

  return (
    <div className="w-full border border-gray-300 rounded-lg overflow-hidden mb-4 shadow-sm bg-white">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 p-4 border-b">
        <div className="flex items-center gap-4">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={exercise.name}
              className="w-20 h-20 object-cover rounded-md border"
            />
          )}
          <div className="ml-3 flex flex-col justify-center">
            <h2 className="text-sm font-semibold leading-tight text-gray-800">
              {exercise.name}
            </h2>
            <div className="flex flex-wrap pt-1 gap-1">
              {exercise.primaryMuscles.map((muscle, index) => (
                <span
                  key={index}
                  className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full"
                >
                  {muscle}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Remove Exercise Button */}
        <button
          onClick={() => onRemoveExercise?.(index)}
          className="text-red-500 text-xs hover:underline"
        >
          Remove
        </button>
      </div>

      {/* Sets */}
      <div className="p-4 flex flex-col items-center align-middle gap-2 w-full">
        {sets.map((set, setIndex) => (
          <SetCard key={setIndex} set={set} setIndex={setIndex} />
        ))}

        {/* Add Set Button */}
        <button
          onClick={addSet}
          className="mt-2 text-sm bg-red-500 py-1 px-2.5 text-white rounded-md font-bold"
        >
          + NEW SET
        </button>
      </div>
    </div>
  );
}
