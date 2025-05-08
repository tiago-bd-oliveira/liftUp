function ExerciseCard({ exercise, onClick }) {
  const capitalize = (str) => str[0].toUpperCase() + str.slice(1, str.length);

  return (
    <div
      className="flex items-center bg-white rounded-xl shadow-sm overflow-hidden p-2 w-full max-w-sm"
      onClick={onClick}
    >
      <img
        src={exercise.images[0]}
        alt={exercise.name}
        className="w-12 h-12 object-cover rounded-md"
      />
      <div className="ml-3 flex flex-col justify-center">
        <h2 className="text-xs font-medium leading-tight">{exercise.name}</h2>
        <div className="flex flex-wrap pt-1">
          {exercise.primaryMuscles.map((muscle, index) => (
            <span
              key={index}
              className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full"
            >
              {capitalize(muscle)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
export default ExerciseCard;
