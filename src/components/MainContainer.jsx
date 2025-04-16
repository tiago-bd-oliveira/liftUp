import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function MainContainer() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Outlet />
      </div>
      <Navbar />
    </div>
  );
}
