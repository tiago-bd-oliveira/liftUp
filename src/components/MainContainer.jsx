import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function MainContainer() {
  return (
    <>
      <div className="mb-6">
        <Outlet />
      </div>
      <Navbar />
    </>
  );
}
