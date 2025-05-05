import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import AppContext from "./AppContext";

export function AppProvider({ children }) {
  const [exercises, setExercises] = useState(null);
  const [workouts, setWorkouts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    fetchExercises();
    fetchWorkouts();
    setLoading(false);

    return () => unsubscribe();
  }, []);

  return (
    <AppContext.Provider value={{ exercises, workouts, loading, currentUser }}>
      {children}
    </AppContext.Provider>
  );
}
