import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { signOut } from "../../features/authSlice";

const Header = () => {
  const isSignIn = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();

  return (
    <nav className="bg-slate-500 flex justify-between items-center p-4">
      <div className=" text-black text-xl pl-2 font-medium cursor-pointer">
        Expense Tracker
      </div>
      <div className=" text-black text-xl pl-2 font-medium">
        {isSignIn === false ? (
          <ul className="p-1 flex space-x-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 ${
                    isActive ? "text-orange-400" : "text-black"
                  } lg:hover:bg-transparent lg:border-0 hover:text-teal-300 lg:p-0`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 ${
                    isActive ? "text-orange-400" : "text-black"
                  } lg:hover:bg-transparent lg:border-0 hover:text-teal-300 lg:p-0`
                }
              >
                Signup/Login
              </NavLink>
              {/* <button onClick={() => dispatch(signIn())}>SignUp</button> */}
            </li>
          </ul>
        ) : (
          <ul className="flex space-x-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 ${
                    isActive ? "text-orange-400" : "text-black"
                  } lg:hover:bg-transparent lg:border-0 hover:text-teal-300 lg:p-0`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/budget"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 ${
                    isActive ? "text-orange-400" : "text-black"
                  } lg:hover:bg-transparent lg:border-0 hover:text-teal-300 lg:p-0`
                }
              >
                Budget
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 ${
                    isActive ? "text-orange-400" : "text-black"
                  } lg:hover:bg-transparent lg:border-0 hover:text-teal-300 lg:p-0`
                }
              >
                Profile
              </NavLink>
            </li>
            <li>
              <button onClick={() => dispatch(signOut())}>Logout</button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;
