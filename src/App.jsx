import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AppProvider } from "./AppProvider";
import MainContainer from "./components/MainContainer";
import SocialScreen from "./Screens/SocialScreen";
import WorkoutScreen from "./Screens/WorkoutScreen";
import ExercisesScreen from "./Screens/ExercisesScreen";
import StatsScreen from "./Screens/StatsScreen";
import UserScreen from "./Screens/UserScreen";
import LoginScreen from "./Screens/LoginScreen";
import ProfileScreen from "./Screens/ProfileScreen";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <AppProvider>
      <Router>
        <Routes>
          {!currentUser ? (
            // Se não estiver logado, vai para login
            <Route path="*" element={<LoginScreen onLogin={(user) => setCurrentUser(user)} />} />
          ) : (
            <Route path="/" element={<MainContainer />}>
              <Route path="social" element={<SocialScreen />} />
              <Route index element={<WorkoutScreen />} />
              <Route path="exercises" element={<ExercisesScreen />} />
              <Route path="stats" element={<StatsScreen />} />
              <Route path="user" element={<UserScreen />} />
              <Route path="profile" element={<ProfileScreen />} />
              <Route path="login" element={<Navigate to="/" />} />
            </Route>
          )}
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
