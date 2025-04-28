import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
function Navbar() {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();

  const { setShowRecruiterLogin } = useContext(AppContext);

  return (
    <div className="shadow  py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt=""
          className="cursor-pointer"
        />
        {user ? (
          <div className="flex gap-4 items-center">
            <Link to="/applications" className="text-gray-600">
              Applied Jobs
            </Link>
            <p>|</p>
            <p className="max-sm:hidden">Hi, {user.firstName}</p>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-4 max-sm:text-xs">
            <button
              onClick={(e) => setShowRecruiterLogin(true)}
              className="text-gray-600"
            >
              Recuiter Login
            </button>
            <button
              className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full"
              onClick={(e) => openSignIn()}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Navbar;
