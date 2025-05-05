import AppContext from "../AppContext";
import { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { MdFilterAlt } from "react-icons/md";
import ExerciseModal from "../components/ExerciseModal";
import NewExerciseModal from "../components/NewExerciseModal";
import ExerciseCard from "../components/ExerciseCard";

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
