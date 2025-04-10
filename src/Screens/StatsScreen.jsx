import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function StatsScreen() {

  const sum = (array) => array.reduce((total, num) => total + num, 0);
  const workoutsPerWeek = [3, 5, 2, 3, 4, 4, 5];
  
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
        date: day.toLocaleDateString("en-GB", { day: "numeric"}),
        isWorkoutDone: true, 
      });
    }

    return days;
  };

  const weekDays = getCurrentWeekDays();

  const handleDayClick = (day) => {
    alert(`Workout clicked for: ${day.date}`);
    // You can add logic here to mark the workout as done or perform other actions
  };

  const labels = getWeekStartDates(7); 

  const data = {
    labels,
    datasets: [
      {
        label: "no of workouts",
        data: workoutsPerWeek,
        backgroundColor: "rgba(75, 192, 192, 0.6)",

        borderColor: "rgba(75, 192, 192, 1)",
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
      <p className="text-2xl sm:text-3xl text-center mt-4" onClick={() => alert("this is stats screen")}>
        Stats
      </p>
      <div className="flex flex-row justify-between items-center w-full sm:w-3/4 mt-4 p-4" >
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
          <span>Average: {(workoutsPerWeek.reduce((a, b) => a + b, 0) / workoutsPerWeek.length).toFixed(1)}</span>
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
                ? "bg-[rgb(78,234,240)] text-white border-2 hover:bg-[rgb(69,173,177)]"
                : "bg-transparent text-gray-700"
            }`}
          >
            {day.date}
          </button>
        ))}
</div>
    </div>
  );
}