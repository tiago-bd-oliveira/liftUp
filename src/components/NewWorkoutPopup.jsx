// components/NewWorkoutPopup.jsx
export default function NewWorkoutPopup({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 overflow-auto">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-600 text-xl hover:text-gray-800"
      >
        ✖
      </button>
      <h2 className="text-3xl font-bold mb-4">Create New Workout</h2>
      {/* Add form or inputs here */}
      <p className="text-gray-500">
        You can add exercises, name the workout, etc.
      </p>
    </div>
  );
}
