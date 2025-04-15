import { NavLink } from "react-router-dom";
import { CgGym } from "react-icons/cg";
import { LuComponent } from "react-icons/lu";
import { IoShareSocialSharp } from "react-icons/io5";
import { IoIosStats } from "react-icons/io";
import { FaUser } from "react-icons/fa";

const ICONSIZE = 30;

const NavButton = ({ link, Icon }) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `flex items-center justify-center p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 hover:text-blue-500 ${
          isActive ? "bg-blue-100 text-blue-600" : "text-gray-500"
        }`
      }
    >
      <Icon size={ICONSIZE} />
    </NavLink>
  );
};

function Navbar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around items-center h-16 ">
      <NavButton Icon={IoShareSocialSharp} link={"social"} />
      <NavButton Icon={CgGym} link={""} />
      <NavButton Icon={LuComponent} link={"exercises"} />
      <NavButton Icon={IoIosStats} link={"stats"} />
      <NavButton Icon={FaUser} link={"user"} />
    </div>
  );
}

export default Navbar;
