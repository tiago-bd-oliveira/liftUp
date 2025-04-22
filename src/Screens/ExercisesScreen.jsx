import AppContext from "../AppContext";
import { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { MdFilterAlt } from "react-icons/md";
import ExerciseModal from "../components/ExerciseModal";
import NewExerciseModal from "../components/NewExerciseModal";

const capitalize = (str) => str[0].toUpperCase() + str.slice(1, str.length);

const ExerciseCard = ({ exercise, onClick }) => (
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
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [filters, setFilters] = useState([]);
  const [addNewExercise, setAddNewExercise] = useState(false);

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading || exercises == null) return <div>loading</div>;

  return (
    <div className="flex flex-col items-center align-middle justify-center bg-gray-200 gap-1">
      <div className="sticky top-0 z-10 w-full px-4 py-3 bg-gray-200 border-b-2 border-gray-300">
        <div className="flex flex-row items-center w-full max-w-md gap-x-2 bg-white rounded-full shadow px-4 py-2 border border-gray-300">
          <FaSearch size={18} className="text-gray-500 " />
          <input
            type="text"
            placeholder="Search exercises..."
            className="flex-grow bg-transparent focus:outline-none text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <MdFilterAlt
            size={22}
            className="text-gray-500"
            onClick={() => alert("filter feature")}
          />
        </div>
      </div>

      <div className="flex flex-col items-center w-full bg-gray-200 px-4 gap-2">
        {filteredExercises.map((exercise, index) => (
          <ExerciseCard
            exercise={exercise}
            key={index}
            onClick={() => {
              setSelectedExercise(exercise);
              console.log(exercise);
            }}
          />
        ))}
      </div>

      <div className="sticky bottom-20 z-10 flex w-full justify-end pr-6">
        <IoIosAdd
          className="bg-black text-white w-10 h-10 rounded-full p-2 shadow-md hover:bg-gray-800 transition cursor-pointer"
          onClick={() => setAddNewExercise(true)}
        />
      </div>

      {selectedExercise && (
        <ExerciseModal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}

      {addNewExercise && (
        <NewExerciseModal onClose={() => setAddNewExercise(false)} />
      )}
    </div>
  );
}
