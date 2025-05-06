import { setsEqual } from "chart.js/helpers";

export default function WorkoutCard({ workout }) {
  const totalVolume =
    0 +
    workout.exercises
      .map((s) => s.weight * s.reps)
      .reduce((prev, curr) => prev + curr);

  console.log(workout);

  return (
    <div>
      {workout.name} {workout.exercises.length}
    </div>
  );
}
