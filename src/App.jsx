import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppProvider } from "./AppProvider";
import AppContext from "./AppContext";
import MainContainer from "./components/MainContainer";
import SocialScreen from "./Screens/SocialScreen";
import WorkoutScreen from "./Screens/WorkoutScreen";
import ExercisesScreen from "./Screens/ExercisesScreen";
import StatsScreen from "./Screens/StatsScreen";
import UserScreen from "./Screens/UserScreen";
import LoginScreen from "./Screens/LoginScreen";
import ProfileScreen from "./Screens/ProfileScreen";

function AppRoutes() {
  const { currentUser } = useContext(AppContext);

  return (
    <Router>
      <Routes>
        {!currentUser ? (
          <>
            <Route path="*" element={<LoginScreen />} />
          </>
        ) : (
          <Route path="/" element={<MainContainer />}>
            <Route index element={<WorkoutScreen />} />
            <Route path="social" element={<SocialScreen />} />
            <Route path="exercises" element={<ExercisesScreen />} />
            <Route path="stats" element={<StatsScreen />} />
            <Route path="user" element={<UserScreen />} />
            <Route path="profile" element={<ProfileScreen />} />
            <Route path="login" element={<Navigate to="/" />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
