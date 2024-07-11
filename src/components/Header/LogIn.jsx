import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../../features/authSlice";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

const LogIn = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [err, setErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const currEmail = loginData.email;
    const oldEmail = JSON.parse(localStorage.getItem("user")).email;
    const currPassword = loginData.password;
    const oldPassword = JSON.parse(localStorage.getItem("user")).password;

    if (oldEmail === currEmail && oldPassword === currPassword) {
      setLoginData({
        ...loginData,
        isLogin: true,
      });
      dispatch(signIn());
      navigate("/");
      setErr("");
    } else {
      setErr("Incorrect information");
      setLoginData({
        ...loginData,
      });
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg space-y-6"
      >
        <h1 className="text-2xl font-bold text-center text-gray-700">Login</h1>
        <div>
          <label className="block text-gray-600">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={loginData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-gray-600">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={loginData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 font-semibold text-white bg-[#1D7C53] rounded hover:bg-[#FE736D] focus:outline-none focus:ring focus:ring-green-500"
        >
          Login
        </button>
        {err && <div className="mt-2 text-xl text-red-600">{err}</div>}
      </form>

      <div className="mt-4 text-gray-600">
        Haven't signed up?{" "}
        <NavLink to="/signup" className="font-medium text-blue-600">
          <u>Signup</u>
        </NavLink>
      </div>
    </div>
  );
};

export default LogIn;
