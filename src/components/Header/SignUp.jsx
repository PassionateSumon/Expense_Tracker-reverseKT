import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { signIn } from "../../features/authSlice";
import { NavLink, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    password: "",
    age: "",
    gender: "",
  });
  const [err, setErr] = useState({});
  const dispatch = useDispatch();

  const signUpObject = Yup.object({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .min(8, "Password should be at least 8 characters")
      .matches(
        /[!@#$%^&*()<>|{}.?:;"~]/,
        "Password should have at least one special character"
      )
      .matches(/[a-z]/, "Password should have at least one lowercase character")
      .matches(/[A-Z]/, "Password should have at least one uppercase character")
      .matches(/[0-9]/, "Password should have at least one digit")
      .required("Password is required"),
    age: Yup.number()
      .typeError("Age must be a number")
      .min(18, "Age must be above 18")
      .max(90, "Age must be below 90")
      .required("Age is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUpObject.validate(data, { abortEarly: false });
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(signIn());
      navigate("/");
      setErr({});
    } catch (error) {
      const allErrors = {};
      error.inner.forEach((err) => {
        allErrors[err.path] = err.message;
      });
      setErr(allErrors);
    }
  };

  const handleClick = (e) => {
    let { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg space-y-3"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-center text-gray-700">
          Sign Up
        </h1>
        <div>
          <label className="block text-gray-600">First name:</label>
          <input
            type="text"
            name="firstname"
            value={data.firstname}
            placeholder="Enter First name"
            onChange={handleClick}
            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-500"
          />
          {err.firstname && <div className="text-red-500">{err.firstname}</div>}
        </div>

        <div>
          <label className="block text-gray-600">Last name:</label>
          <input
            type="text"
            name="lastname"
            value={data.lastname}
            placeholder="Enter Last name"
            onChange={handleClick}
            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-500"
          />
          {err.lastname && <div className="text-red-500">{err.lastname}</div>}
        </div>

        <div>
          <label className="block text-gray-600">Email:</label>
          <input
            type="email"
            name="email"
            value={data.email}
            placeholder="Enter Email"
            onChange={handleClick}
            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-500"
          />
          {err.email && <div className="text-red-500">{err.email}</div>}
        </div>

        <div>
          <label className="block text-gray-600">Phone Number:</label>
          <input
            type="number"
            name="phoneNumber"
            value={data.phoneNumber}
            placeholder="Enter Phone Number"
            onChange={handleClick}
            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-500"
          />
          {err.phoneNumber && (
            <div className="text-red-500">{err.phoneNumber}</div>
          )}
        </div>

        <div>
          <label className="block text-gray-600">Password:</label>
          <input
            type="password"
            name="password"
            value={data.password}
            placeholder="Enter Password"
            onChange={handleClick}
            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-500"
          />
          {err.password && <div className="text-red-500">{err.password}</div>}
        </div>

        <div>
          <label className="block text-gray-600">Age:</label>
          <input
            type="number"
            name="age"
            value={data.age}
            placeholder="Enter Age"
            onChange={handleClick}
            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-500"
          />
          {err.age && <div className="text-red-500">{err.age}</div>}
        </div>

        <div>
          <label className="block text-gray-600">Gender:</label>
          <select
            name="gender"
            onChange={handleClick}
            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-500"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {err.gender && <div className="text-red-500">{err.gender}</div>}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 font-semibold text-white bg-[#1D7C53] rounded hover:bg-[#FE736D] focus:outline-none focus:ring focus:ring-green-500"
        >
          Submit
        </button>
      </form>
      <div className="mt-4 text-gray-600">
        Already signed up?{" "}
        <NavLink to="/login" className="font-medium text-blue-600">
          <u>Login</u>
        </NavLink>
      </div>
    </div>
  );
};

export default SignUp;
