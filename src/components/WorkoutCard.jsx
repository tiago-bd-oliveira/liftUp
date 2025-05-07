import { FaDumbbell, FaListUl } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function WorkoutCard({ workout, isSelected, onSelect }) {
  const navigate = useNavigate();

  const totalVolume = workout.exercises.reduce(
    (vol, ex) =>
      vol + ex.sets.reduce((setVol, s) => setVol + s.weight * s.reps, 0),
    0
  );

  const startWorkout = () => {
    navigate("/workout", {
      state: { workout: workout },
    });
  };

  const exerciseCount = workout.exercises.length;
  return (
    <div className="w-full max-w-md cursor-pointer select-none rounded-2xl shadow-sm border bg-white border-gray-200 flex flex-col p-4 ">
      <div
        onClick={() => onSelect(workout)}
        className="flex justify-between items-center gap-4"
      >
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800">
            {workout.name}
          </h3>

          <div className="mt-1 flex flex-col gap-3 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <FaListUl className="inline-block" aria-hidden />
              {exerciseCount} exercises
            </span>

            <span className="flex items-center gap-1">
              <FaDumbbell className="inline-block" aria-hidden />
              {totalVolume} kg
              <span className="ml-0.5 ">Total Volume</span>
            </span>
          </div>
        </div>
        {isSelected ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      <AnimatePresence initial={false}>
        {isSelected && (
          <div className="flex justify-center gap-4 w-full mt-4">
            <button className="w-full bg-red-50 text-red-600 border border-red-600 p-2 rounded-lg">
              EDIT
            </button>
            <button
              className="w-full bg-red-600 text-white p-2 rounded-lg"
              onClick={startWorkout}
            >
              START
            </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
