import SetCard from "./SetCard";

export default function ExerciseExecuteCard({
  exercise,
  completion = [],
  onToggle,
}) {
  const imageUrl = exercise.images?.[0];

  return (
    <div className="w-full flex flex-col border border-gray-300 rounded-lg mb-4 shadow-sm bg-white">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={exercise.name}
            className="w-20 h-20 object-cover rounded-md border"
          />
        )}
        <div className="ml-3">
          <h2 className="text-sm font-semibold text-gray-800">
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

      {/* Set list */}
      <div className="bg-gray-100 flex flex-col p-2 gap-2">
        {exercise.sets.map((set, index) => (
          <SetCard
            key={index}
            set={set}
            isComplete={completion[index]}
            onToggle={() => onToggle(index)}
          />
        ))}
      </div>
    </div>
  );
}
