export default function WorkoutScreen() {
  return (
    <div className="flex flex-col items-center px-4 py-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-2xl font-bold text-gray-600 mb-6">your workouts</div>

      {/* Workout list container (placeholder for now) */}
      <div className="w-full max-w-md flex flex-col gap-4 mb-6">
        {/* Example of where workout items would go */}
        {/* <WorkoutItem /> */}
      </div>

      {/* New workout button */}
      <button
        onClick={() => alert("add new workout!")}
        className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-blue-600 transition duration-200 cursor-pointer"
      >
        + New Workout
      </button>
    </div>
  );
}
