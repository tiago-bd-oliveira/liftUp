import { useRef, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const capitalize = (str) => str[0].toUpperCase() + str.slice(1, str.length);

export default function ExerciseModal({ exercise, onClose }) {
  const modalRef = useRef();

  const [imgUrlIndex, setImgUrlIndex] = useState(0);
  const imgUrl = exercise.images[imgUrlIndex];

  const handleImageClick = () => {
    setImgUrlIndex((prev) => (prev + 1) % exercise.images.length);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleTouchOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleTouchOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleTouchOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 backdrop-brightness-90 flex items-center justify-center px-2">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-lg flex flex-col gap-3"
        style={{ maxHeight: "75vh" }}
      >
        <div className="flex flex-row justify-between align-middle items-center">
          <h2 className="text-lg font-semibold">{exercise.name}</h2>
          <IoClose size={30} onClick={onClose} />
        </div>

        {/* Main content section */}
        <div className="overflow-y-auto max-h-[60vh]">
          <img
            src={imgUrl}
            alt={exercise.name}
            className="w-full h-48 object-cover rounded-md mb-3"
            onClick={handleImageClick}
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
          {/* Instructions Section */}
          {exercise.instructions && (
            <div className="text-sm text-gray-700">
              <strong>Instructions:</strong>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                {exercise.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
