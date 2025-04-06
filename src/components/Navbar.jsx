import { NavLink } from "react-router-dom";
import { CgGym } from "react-icons/cg";

function Navbar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around items-center h-16 z-50">
      <NavLink
        to="/social"
        className={({ isActive }) =>
          isActive ? "text-blue-500" : "text-gray-500"
        }
      >
        <p>social</p>
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-blue-500" : "text-gray-500"
        }
      >
        <CgGym />
      </NavLink>
      <NavLink
        to="/exercises"
        className={({ isActive }) =>
          isActive ? "text-blue-500" : "text-gray-500"
        }
      >
        <p>exercises</p>
      </NavLink>
      <NavLink
        to="/stats"
        className={({ isActive }) =>
          isActive ? "text-blue-500" : "text-gray-500"
        }
      >
        <p>Stats</p>
      </NavLink>
      <NavLink
        to="/user"
        className={({ isActive }) =>
          isActive ? "text-blue-500" : "text-gray-500"
        }
      >
        <p>User</p>
      </NavLink>
    </div>
  );
}

export default Navbar;
