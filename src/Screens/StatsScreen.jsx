import { Bar } from "react-chartjs-2";
import React, { useCallback } from "react";
import Model from "react-body-highlighter";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function StatsScreen() {
  const musclesData = [
    { name: "Bench Press", muscles: ["chest", "triceps", "front-deltoids"] },
    { name: "Push Ups", muscles: ["chest"] },
    { name: "Abs Crunch", muscles: ["abs"] },
  ];

  const handleClickMuscles = useCallback(({ muscle, data }) => {
    console.log("Muscle clicked:", muscle);
    console.log("Data:", data);

    if (!data || data.exercises.length === 0) {
      alert(
        `You clicked the ${muscle}, no exercises done targeted this muscle.`
      );
      return;
    }

    const exercises = data.exercises.map((exercise) => exercise).join(", ");
    alert(
      `You clicked the ${muscle}! Exercises targeting this muscle: ${exercises}`
    );
  }, []);

  const sum = (array) => array.reduce((total, num) => total + num, 0);
  const workoutsPerWeek = [3, 5, 2, 3, 4, 4, 2];

  const workouts = sum(workoutsPerWeek);
  const time = 45 * workouts;
  const volume = 150 * 3 * 8 * workouts;

  const getWeekStartDates = (numWeeks) => {
    const dates = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() - today.getDay());

    for (let i = 0; i < numWeeks; i++) {
      const weekStart = new Date(currentWeekStart);
      weekStart.setDate(currentWeekStart.getDate() - i * 7);

      const formattedDate = weekStart.toLocaleDateString("en-GB", {
        month: "long",
        day: "numeric",
      });

      dates.unshift(formattedDate);
    }

    return dates;
  };

  const getCurrentWeekDays = () => {
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() - today.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(currentWeekStart);
      day.setDate(currentWeekStart.getDate() + i);
      days.push({
        date: day.toLocaleDateString("en-GB", { day: "numeric" }),
        isWorkoutDone: i < 2,
      });
    }

    return days;
  };

  const weekDays = getCurrentWeekDays();

  const handleDayClick = (day) => {
    alert(`Workout clicked for: ${day.date}`);
    // Vai para o workout do dia
  };

  const labels = getWeekStartDates(7);

  const data = {
    labels,
    datasets: [
      {
        label: "no of workouts",
        data: workoutsPerWeek,
        backgroundColor: "rgba(240, 50, 50, 0.6)",

        borderColor: "rgba(240, 100, 100, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Workouts Per Week",
      },
    },
  };

  return (
    <div className="flex flex-col justify-center items-center px-4 sm:px-8">
      <p
        className="text-2xl sm:text-3xl text-center mt-4"
        onClick={() => alert("this is stats screen")}
      >
        Stats
      </p>
      <div className="flex flex-row justify-between items-center w-full sm:w-3/4 mt-4 p-4">
        <div className="flex flex-col text-base sm:text-lg font-semibold items-center">
          <span>Workouts</span>
          <span>{workouts}</span>
        </div>
        <div className="flex flex-col text-base sm:text-lg font-semibold items-center">
          <span>Time (min)</span>
          <span>{time}</span>
        </div>
        <div className="flex flex-col text-base sm:text-lg font-semibold items-center">
          <span>Volume</span>
          <span>{volume}</span>
        </div>
      </div>
      <div className="w-full sm:w-3/4 mt-8">
        <Bar data={data} options={options} />
        <div className="flex flex-col text-base sm:text-lg items-center mb-4 text-gray-500">
          <span>
            Average:{" "}
            {(
              workoutsPerWeek.reduce((a, b) => a + b, 0) /
              workoutsPerWeek.length
            ).toFixed(1)}
          </span>
        </div>
      </div>
      <div className="flex flex-col text-base sm:text-lg font-semibold items-center">
        <span>Workouts this week:</span>
      </div>
      <div className="flex justify-between items-center w-full sm:w-3/4 mt-8">
        {weekDays.map((day, index) => (
          <button
            key={index}
            onClick={() => handleDayClick(day)}
            className={`px-4 py-2 rounded-full ${
              day.isWorkoutDone
                ? "bg-[rgb(240,50,50)] text-white border-2 hover:bg-[rgb(245,92,92)]"
                : "bg-transparent text-gray-700"
            }`}
          >
            {day.date}
          </button>
        ))}
      </div>
      <div className="flex flex-row justify-center items-center gap-8 mt-8 flex-nowrap">
        <div className="flex flex-col items-center w-1/2">
          <Model
            data={musclesData}
            type="anterior" 
            style={{ width: "100%", maxWidth: "20rem", padding: "2rem" }}
            highlightedColors={["#f8c1c1","#f49797","#f06d6d","#e63939",]}
            onClick={handleClickMuscles}
          />
        </div>

        {/* Back View */}
        <div className="flex flex-col items-center w-1/2">
          <Model
            data={musclesData}
            type="posterior"
            style={{ width: "100%", maxWidth: "20rem", padding: "2rem" }}
            highlightedColors={["#f8c1c1","#f49797","#f06d6d","#e63939",]}
            onClick={handleClickMuscles}
          />
        </div>
      </div>
      </div>
  );
}
