import AppContext from "../AppContext";
import { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";

const capitalize = (str) => str[0].toUpperCase() + str.slice(1, str.length);

const ExerciseCard = ({ exercise }) => (
  <div className="flex items-center bg-white rounded-xl shadow-sm overflow-hidden mb-2 p-2 w-full max-w-sm">
    <img
      src={exercise.images[0]}
      alt={exercise.name}
      className="w-12 h-12 object-cover rounded-md"
    />
    <div className="ml-3 flex flex-col justify-center">
      <h2 className="text-xs font-medium leading-tight">{exercise.name}</h2>
      <div className="flex flex-wrap gap-1 mt-1">
        {exercise.primaryMuscles.map((muscle, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full"
          >
            {capitalize(muscle)}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default function ExercisesScreen() {
  const { exercises, loading } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().match(searchQuery.toLowerCase())
  );

  if (loading || exercises == null) return <div>loading</div>;

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10 w-full px-4 py-3 bg-gray-200">
        <div className="flex items-center w-full max-w-md mx-auto bg-white rounded-full shadow px-4 py-2 border border-gray-300">
          <FaSearch size={18} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search exercises..."
            className="flex-grow bg-transparent focus:outline-none text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col items-center w-full bg-gray-200 px-4 space-y-2 flex-grow">
        {filteredExercises.map((exercise, index) => (
          <ExerciseCard exercise={exercise} key={index} />
        ))}
      </div>

      <div className="sticky bottom-20 z-10 flex w-full justify-end pr-6">
        <IoIosAdd
          className="bg-black text-white w-10 h-10 rounded-full p-2 shadow-md hover:bg-gray-800 transition cursor-pointer"
          onClick={() => alert("add exercise!")}
        />
      </div>
    </div>
  );
}
