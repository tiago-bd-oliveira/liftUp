import { useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const capitalize = (str) => str[0].toUpperCase() + str.slice(1, str.length);

export default function ExerciseModal({ exercise, onClose }) {
  const modalRef = useRef();

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50  backdrop-brightness-90 flex items-center justify-center px-2">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-lg"
      >
        <div className="flex flex-row justify-between align-middle items-center">
          <h2 className="text-lg font-semibold mb-2">{exercise.name}</h2>
          <IoClose size={30} onClick={onClose} />
        </div>
        <img
          src={exercise.images[0]}
          alt={exercise.name}
          className="w-full h-48 object-cover rounded-md mb-3"
        />
        <div className="mb-2">
          <strong>Primary muscles:</strong>{" "}
          {exercise.primaryMuscles.map(capitalize).join(", ")}
        </div>
        {exercise.secondaryMuscles?.length > 0 && (
          <div className="mb-2">
            <strong>Secondary muscles:</strong>{" "}
            {exercise.secondaryMuscles.map(capitalize).join(", ")}
          </div>
        )}
        {exercise.description && (
          <div className="text-sm text-gray-700">{exercise.description}</div>
        )}
      </div>
    </div>
  );
}
