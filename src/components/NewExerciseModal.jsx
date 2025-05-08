import { useRef, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

export default function NewExerciseModal({ onClose, onSave }) {
  const modalRef = useRef();

  // Form state
  const [exerciseName, setExerciseName] = useState("");
  const [primaryMuscles, setPrimaryMuscles] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({
    name: "",
    muscles: "",
  });

  // Close modal on click or touch outside
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    let formErrors = {};
    if (!exerciseName) formErrors.name = "Exercise name is required";
    if (!primaryMuscles) formErrors.muscles = "Primary muscles are required";

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      // Call the onSave function with the form data
      onSave({ name: exerciseName, muscles: primaryMuscles, image });
      onClose(); // Close modal after saving
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Preview image
    }
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-brightness-90 flex items-center justify-center px-2">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-lg flex flex-col gap-3"
        style={{ maxHeight: "75vh" }}
      >
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-lg font-semibold">Add New Exercise</h2>
          <IoClose size={30} onClick={onClose} />
        </div>

        {/* Form content */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="mb-2">
            <label htmlFor="exerciseName" className="block font-medium">
              Exercise Name
            </label>
            <input
              id="exerciseName"
              type="text"
              className="border rounded-md p-2 w-full"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="primaryMuscles" className="block font-medium">
              Primary Muscles
            </label>
            <input
              id="primaryMuscles"
              type="text"
              className="border rounded-md p-2 w-full"
              value={primaryMuscles}
              onChange={(e) => setPrimaryMuscles(e.target.value)}
            />
            {errors.muscles && (
              <p className="text-red-500 text-sm">{errors.muscles}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block font-medium">
              Exercise Image
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="p-2"
            />
            {image && (
              <div className="mt-2">
                <img
                  src={image}
                  alt="Exercise Preview"
                  className="w-32 h-32 object-cover"
                />
              </div>
            )}
          </div>

          <div className="flex justify-between gap-4">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md"
              onClick={onClose}
            >
              Save Exercise
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
