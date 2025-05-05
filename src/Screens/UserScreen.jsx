import { BsEmojiSmile } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { IoLanguage } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function UserScreen() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Logout via Firebase Auth
      navigate("/");       // Redireciona para a página inicial (login)
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      alert("Erro ao fazer logout: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="mb-8">
        <p
          className="text-6xl font-bold cursor-pointer text-gray-800 hover:text-gray-600 transition"
          onClick={() => alert("This is user screen")}
        >
          User
        </p>
      </div>

      <div className="w-full max-w-md bg-white border border-gray-300 rounded-2xl shadow-md p-6 space-y-10">
        <div>
          <p className="text-center text-3xl font-bold text-red-700 mb-6">
            Settings
          </p>
          <div className="flex flex-col space-y-5">
            <a href="/profile" className="flex items-center text-gray-700 hover:text-red-700 text-lg">
              <BsEmojiSmile className="mr-3 text-2xl" />
              My Profile
            </a>
            <a href="/settings" className="flex items-center text-gray-700 hover:text-red-700 text-lg">
              <IoMdSettings className="mr-3 text-2xl" />
              General Settings
            </a>
            <a href="/language" className="flex items-center text-gray-700 hover:text-red-700 text-lg">
              <IoLanguage className="mr-3 text-2xl" />
              Language
            </a>
          </div>
        </div>

        <div>
          <p className="text-center text-3xl font-bold text-red-700 mb-6">
            Help
          </p>
          <div className="flex flex-col space-y-5">
            <a href="/faq" className="flex items-center text-gray-700 hover:text-red-700 text-lg">
              <FaQuestion className="mr-3 text-2xl" />
              FAQ
            </a>
            <a href="/contact" className="flex items-center text-gray-700 hover:text-red-700 text-lg">
              <IoIosMail className="mr-3 text-2xl" />
              Contact Us
            </a>
            <a href="/rate-us" className="flex items-center text-gray-700 hover:text-red-700 text-lg">
              <FaStar className="mr-3 text-2xl" />
              Rate Us
            </a>
            <a href="/feedback" className="flex items-center text-gray-700 hover:text-red-700 text-lg">
              <FaPencilAlt className="mr-3 text-2xl" />
              Feedback
            </a>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg shadow transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
