import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Stopwatch from "../components/Stopwatch";

export default function WorkoutExecutionScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { workout } = location.state || {};
  const [finishedSets, setFinishedSets] = useState(0);

  const totalSets = workout.exercises.reduce(
    (prev, curr) => prev + curr.sets.length,
    0
  );

  const endWorkout = () => {
    navigate("/");
  };

  const incFinishedSets = (n) => setFinishedSets(finishedSets + n);

  const isFinished = totalSets == finishedSets;

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col justify-start items-center align-middle">
      <div className="w-full flex justify-between align-middle items-center px-3 py-2 border-b">
        <span className="text-gray-900" onClick={endWorkout}>
          <FaArrowLeft size={26} />
        </span>
        <div className="flex-col justify-center align-middle items-center">
          <h2 className="text-sm">{workout.name}</h2>
          <Stopwatch />
        </div>
        <div></div>
      </div>
      <div className="flex-col justify-start items-center align-middle">
        {workout.exercises.map((ex, index) => (
          <div key={index}>{ex.name}</div>
        ))}
      </div>
      <div>{totalSets}</div>
    </div>
  );
}
