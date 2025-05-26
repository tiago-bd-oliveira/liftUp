import { useState } from "react";
import EditableSet from "./EditableSet";

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
      { id: Date.now(), weight: lastSet.weight, reps: lastSet.reps },
    ];
    setSets(updatedSets);
    onUpdateSets?.(index, updatedSets);
  };

  const deleteSet = (setIndex) => {
    const updatedSets = sets.filter((_, i) => i !== setIndex);
    setSets(updatedSets);
    onUpdateSets?.(index, updatedSets);
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
          <EditableSet
            key={set.id}
            set={set}
            setIndex={setIndex}
            handleSetChange={handleSetChange}
            deleteSet={deleteSet}
          />
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
