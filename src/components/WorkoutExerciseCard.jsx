import { useState } from "react";

export default function WorkoutExerciseCard({ exercise, index, onUpdateSets }) {
  const [sets, setSets] = useState(exercise.sets || []);
  const imageUrl = exercise.images?.[0];

  const handleSetChange = (setIndex, field, value) => {
    const updatedSets = sets.map((set, i) =>
      i === setIndex ? { ...set, [field]: Number(value) } : set
    );
    setSets(updatedSets);
    onUpdateSets?.(index, updatedSets);
  };

  const addSet = () => {
    const updatedSets = [...sets, { weight: 0, reps: 0 }];
    setSets(updatedSets);
    onUpdateSets?.(index, updatedSets);
  };

  return (
    <div className="w-full border border-gray-300 rounded-lg overflow-hidden mb-4 shadow-sm bg-white">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b">
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

      {/* Sets */}
      <div className="p-4 flex flex-col gap-2">
        {sets.map((set, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-2 px-3 py-2 border rounded-md bg-gray-50"
          >
            <span className="text-sm text-gray-700">{index + 1}</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="w-15 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={set.reps}
                onChange={(e) => handleSetChange(index, "reps", e.target.value)}
                placeholder="Reps"
              />
              <span className="text-sm text-gray-500">×</span>
              <input
                type="number"
                className="w-15 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={set.weight}
                onChange={(e) =>
                  handleSetChange(index, "weight", e.target.value)
                }
                placeholder="Weight"
              />
              <span className="text-sm text-gray-500">kg</span>
            </div>
          </div>
        ))}

        {/* Add Set Button */}
        <button
          onClick={addSet}
          className="mt-2 text-sm text-blue-600 hover:underline self-start"
        >
          + Add Set
        </button>
      </div>
    </div>
  );
}
