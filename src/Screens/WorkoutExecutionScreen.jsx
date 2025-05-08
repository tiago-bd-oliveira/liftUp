import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Stopwatch from "../components/Stopwatch";
import ExerciseExecuteCard from "../components/ExercsíseExecuteCard";

export default function WorkoutExecutionScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { workout } = location.state || {};
  const [showWarning, setShowWarning] = useState(false);

  const totalSets = workout.exercises.reduce(
    (sum, ex) => sum + ex.sets.length,
    0
  );

  const [completionMap, setCompletionMap] = useState(
    workout.exercises.map((ex) => ex.sets.map(() => false))
  );

  const toggleSet = (exerciseIndex, setIndex) => {
    setCompletionMap((prev) => {
      const updated = prev.map((arr) => [...arr]);
      const wasComplete = updated[exerciseIndex][setIndex];
      updated[exerciseIndex][setIndex] = !wasComplete;
      return updated;
    });
  };

  const completeNextSet = () => {
    for (let i = 0; i < completionMap.length; i++) {
      const setIndex = completionMap[i].indexOf(false);
      if (setIndex !== -1) {
        toggleSet(i, setIndex);
        break;
      }
    }
  };

  const finishedSets = completionMap.reduce(
    (prev, ex) => prev + ex.reduce((prev, s) => (s ? prev + 1 : prev), 0),
    0
  );

  const isFinished = finishedSets === totalSets;

  const exit = () => navigate("/");

  const finishWorkout = () => {
    if (isFinished) exit();
    else setShowWarning(true);
  };

  const LogNextButton = () => (
    <button
      onClick={completeNextSet}
      className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold"
      disabled={isFinished}
    >
      LOG NEXT SET
    </button>
  );

  const FinishWorkoutButton = () => (
    <button
      onClick={() => navigate("/")}
      className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold"
      disabled={!isFinished}
    >
      FINNISH WORKOUT
    </button>
  );

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center pb-20">
      {/* Header */}
      <div className="w-full flex justify-between items-center px-3 py-2 border-b bg-white">
        <span className="text-gray-900" onClick={finishWorkout}>
          <FaArrowLeft size={26} />
        </span>
        <div className="flex-col justify-center items-center">
          <h2 className="text-sm">{workout.name}</h2>
          <Stopwatch />
        </div>
        <div></div>
      </div>

      {/* Exercises */}
      <div className="w-full max-w-md px-3 py-4">
        {workout.exercises.map((exercise, index) => (
          <ExerciseExecuteCard
            key={index}
            exercise={exercise}
            completion={completionMap[index]}
            onToggle={(setIdx) => toggleSet(index, setIdx)}
          />
        ))}
      </div>

      {/* Fixed bottom button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-3 border-t shadow-inner flex justify-center">
        {isFinished ? <FinishWorkoutButton /> : <LogNextButton />}
      </div>

      {showWarning && (
        <div className="fixed inset-0 backdrop-brightness-90 backdrop-blur-[1px] flex justify-center items-center z-50 ">
          <div className="bg-white rounded-lg shadow-lg p-6 w-fit text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              End workout early?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              You haven't completed all sets. Are you sure you want to quit?
            </p>
            <div className="flex justify-between gap-4">
              <button
                onClick={exit}
                className="bg-red-500 text-white px-4 py-2 rounded-md font-medium hover:bg-red-600 w-full"
              >
                Yes, Quit
              </button>
              <button
                onClick={() => setShowWarning(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-400 w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
