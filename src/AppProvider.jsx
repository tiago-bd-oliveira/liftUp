import { useState, useEffect } from "react";
import AppContext from "./AppContext";

export function AppProvider({ children }) {
  const [exercises, setExercises] = useState(null);
  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState(null);

  const fetchExercises = () => {
    fetch("data/exercises.json")
      .then((res) => res.json())
      .then((json) => setExercises(json))
      .catch((err) => console.error("Failed to load JSON:", err));
  };

  const fetchWorkouts = () => {
    fetch("data/workouts.json")
      .then((res) => res.json())
      .then((json) => setWorkouts(json))
      .catch((err) => console.error("Failed to load JSON:", err));
  };

  useEffect(() => {
    setLoading(true);
    fetchExercises();
    fetchWorkouts();
    setLoading(false);
  }, []);

  return (
    <AppContext.Provider value={{ exercises, loading, workouts }}>
      {children}
    </AppContext.Provider>
  );
}
