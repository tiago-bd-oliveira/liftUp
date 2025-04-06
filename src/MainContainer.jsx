import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function MainContainer() {
  return (
    <div className="relative min-h-screen pb-16">
      <Outlet />
      <Navbar />
    </div>
  );
}
