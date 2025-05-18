import { useContext, useState } from "react";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { MdFilterAlt } from "react-icons/md";
import AppContext from "../AppContext";
import ExerciseCard from "./ExerciseCard";

export default function ExerciseSearchModal({ onClose, onSelect }) {
  const { exercises, loading } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExercises = exercises?.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading || !exercises) return <div className="p-6">Loading...</div>;

  return (
    <div className="fixed inset-0 z-50 bg-gray-100 flex flex-col  overflow-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 ">
        <div className="flex justify-between items-center  relative p-3 bg-white border-b-gray-300 border-b">
          <button onClick={onClose} className="text-gray-700 hover:text-black">
            <FaArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-semibold text-center">Select Exercise</h2>
          <div></div>
        </div>

        {/* Search bar with Filter button */}
        <div className="w-full px-4 py-3 ">
          <div className="flex items-center justify-between w-full max-w-md mx-auto rounded-full shadow px-4 py-2 border border-gray-300 bg-white">
            <FaSearch size={18} className="text-gray-500" />

            <input
              type="text"
              placeholder="Search exercises..."
              className="flex-grow bg-transparent px-2 focus:outline-none text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <button
              onClick={() => alert("filter feature")}
              className="p-1 rounded-full transition"
            >
              <MdFilterAlt size={22} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Exercises list */}
      <div className="flex flex-col items-center w-full px-4 gap-2">
        {filteredExercises.length > 0 ? (
          filteredExercises.map((exercise, index) => (
            <ExerciseCard
              key={index}
              exercise={exercise}
              onClick={() => {
                const new_exercise = { ...exercise, sets: [] };
                onSelect?.(new_exercise); // Callback to pass the selected exercise back
                onClose();
              }}
            />
          ))
        ) : (
          <div className="text-gray-500 mt-8">No exercises found.</div>
        )}
      </div>
    </div>
  );
}
