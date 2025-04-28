import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      {/* Navbar reccuriter Panal */}
      <div className="shadow py-5">
        <div className="px-5 flex justify-between items-center">
          <img
            onClick={(e) => navigate("/")}
            src={assets.logo}
            alt=""
            className="max-sm:w-32 cursor-pointer"
          />
          <div className="flex items-center gap-3">
            <p className="max-sm:hidden">Welcome, Jumaa</p>
            <div className="relative group">
              <img
                className="w-8 border rounded-full cursor-pointer"
                src={assets.company_icon}
                alt=""
              />
              <div className="absolute hidden group-hover:block top-0 right-0 text-black z-10 rounded pt-12">
                <ul className="list-none bg-white m-0 p-2 rounded-md border text-sm">
                  <li className="py-1 px-2 cursor-pointer pr-10">Logout</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-start">
        {/* Left Side bar */}
        <div className="inline-block min-h-screen border-r-2">
          <ul className="flex- flex-col items-start pt-5 text-gray-800">
            <NavLink
              className={({ isActive }) =>
                ` flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive && "bg-blue-100 border-r-4 border-blue-500 "
                }`
              }
              to={"/dashboard/add-job"}
            >
              <img className="min-w-4" src={assets.add_icon} alt="" />
              <p className="max-sm:hidden">Add Job</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                ` flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive && "bg-blue-100 border-r-4 border-blue-500 "
                }`
              }
              to={"/dashboard/manage-jobs"}
            >
              <img className="min-w-4" src={assets.home_icon} alt="" />
              <p className="max-sm:hidden">Maanage Jobs</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                ` flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive && "bg-blue-100 border-r-4 border-blue-500 "
                }`
              }
              to={"/dashboard/view-applications"}
            >
              <img className="min-w-4" src={assets.person_tick_icon} alt="" />
              <p className="max-sm:hidden">View Applications</p>
            </NavLink>
          </ul>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
