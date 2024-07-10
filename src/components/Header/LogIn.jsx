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
    // console.log(e.target)
    let { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={loginData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={loginData.password}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="border-2 border-solid border-black bg-[#CADCFC] rounded-lg p-1"
        >
          Login
        </button>
      {err && <div className="text-xl text-red-600">{err}</div>}
      </form>

      <div>Haven't done Signup? <NavLink to='/signup' className='font-medium text-blue-950'><u>Signup</u></NavLink> </div>

    </div>
  );
};

export default LogIn;
