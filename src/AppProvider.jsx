import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import AppContext from "./AppContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

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

  const fetchWorkouts = async (userId) => {
    try {
      const q = query(collection(db, "workouts"), where("userId", "==", userId));
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWorkouts(docs);
    } catch (err) {
      console.error("Failed to load workouts from Firestore:", err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        fetchExercises();
        fetchWorkouts(user.uid); 
      } else {
        setWorkouts([]); 
      }
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (workouts) {
      localStorage.setItem("workouts", JSON.stringify(workouts));
    }
  }, [workouts]);

  return (
    <AppContext.Provider
      value={{ exercises, loading, workouts, setWorkouts, currentUser }}
    >
      {children}
    </AppContext.Provider>
  );
}
