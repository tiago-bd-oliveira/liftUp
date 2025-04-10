import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./AppProvider";
import MainContainer from "./components/MainContainer";
import SocialScreen from "./Screens/SocialScreen";
import WorkoutScreen from "./Screens/WorkoutScreen";
import ExercisesScreen from "./Screens/ExercisesScreen";
import StatsScreen from "./Screens/StatsScreen";
import UserScreen from "./Screens/UserScreen";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainContainer />}>
            <Route path="social" element={<SocialScreen />} />
            <Route index element={<WorkoutScreen />} />
            <Route path="exercises" element={<ExercisesScreen />} />
            <Route path="stats" element={<StatsScreen />} />
            <Route path="user" element={<UserScreen />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
