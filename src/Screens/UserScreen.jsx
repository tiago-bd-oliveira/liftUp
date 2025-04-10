import { BsEmojiSmile } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { IoLanguage } from "react-icons/io5";

export default function UserScreen() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-center items-center mb-8">
        <p
          className="text-6xl font-bold cursor-pointer text-gray-800 hover:text-gray-600 transition"
          onClick={() => alert("This is user screen")}
        >
          User
        </p>
      </div>


      <div className="w-full max-w-md mx-auto bg-white border border-gray-300 rounded-2xl shadow-md pt-4 pl-4 pb-4">
        <p className="text-center text-3xl font-bold text-red-700 mb-6">
          Settings
        </p>

        <div className="flex flex-col space-y-5">
          <a
            href="/profile"
            className="flex items-center text-gray-700 hover:text-red-700 text-lg"
          >
            <BsEmojiSmile className="mr-2 text-xl" />
            My Profile
          </a>
          <a
            href="/notifications"
            className="flex items-center text-gray-700 hover:text-red-700 text-lg"
          >
            <IoMdSettings className="mr-2 text-xl" />
            General Settings
          </a>
          <a
            href="/logout"
            className="flex items-center text-gray-700 hover:text-red-700 text-lg"
          >
            <IoLanguage className="mr-2 text-xl" />
            Language
          </a>
        </div>
      </div>
    </div>
  );
}
