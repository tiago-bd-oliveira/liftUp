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
    const stored = localStorage.getItem("workouts");
    if (stored) {
      setWorkouts(JSON.parse(stored));
    } else {
      fetch("data/workouts.json")
        .then((res) => res.json())
        .then((json) => {
          setWorkouts(json);
          localStorage.setItem("workouts", JSON.stringify(json));
        })
        .catch((err) => console.error("Failed to load JSON:", err));
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchExercises();
    fetchWorkouts();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (workouts) {
      localStorage.setItem("workouts", JSON.stringify(workouts));
    }
  }, [workouts]);

  return (
    <AppContext.Provider value={{ exercises, loading, workouts, setWorkouts }}>
      {children}
    </AppContext.Provider>
  );
}
