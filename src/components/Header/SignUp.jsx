import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { signIn } from "../../features/authSlice";
import { NavLink, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate()
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
      .min(8, "Password should be atleast 8 characters")
      .matches(
        /[!@#$%^&*()<>|{}.?:;"~]/,
        "Password should have atleast one special character"
      )
      .matches(/[a-z]/, "Password should have atleast one lowercase character")
      .matches(/[A-Z]/, "Password should have atleast one uppercase character")
      .matches(/[0-9]/, "Password should have atleast one digit")
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
      navigate('/')
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
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label>First name:</label>
          <input
            type="text"
            name="firstname"
            value={data.firstname}
            placeholder="Enter First name"
            onChange={handleClick}
          />
          {err.firstname && <div className="err">*{err.firstname}</div>}
        </div>

        <div>
          <label>Last name:</label>
          <input
            type="text"
            name="lastname"
            value={data.lastname}
            placeholder="Enter Last name"
            onChange={handleClick}
          />
          {err.lastname && <div className="err">*{err.lastname}</div>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={data.email}
            placeholder="Enter Email"
            onChange={handleClick}
          />
          {err.email && <div className="err">*{err.email}</div>}
        </div>

        <div>
          <label>Phone Number:</label>
          <input
            type="number"
            name="phoneNumber"
            value={data.phoneNumber}
            placeholder="Enter Phone Number"
            onChange={handleClick}
          />
          {err.phoneNumber && <div className="err">*{err.phoneNumber}</div>}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={data.password}
            placeholder="Enter Password"
            onChange={handleClick}
          />
          {err.password && <div className="err">*{err.password}</div>}
        </div>

        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={data.age}
            placeholder="Enter Age"
            onChange={handleClick}
          />
          {err.age && <div className="err">*{err.age}</div>}
        </div>

        <div>
          <label>Gender:</label>
          <select name="gender" onChange={handleClick}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {err.gender && <div className="err">*{err.gender}</div>}
        </div>

        <button
          type="submit"
          className="border-2 border-solid border-black bg-[#CADCFC] rounded-lg p-1"
        >
          Submit
        </button>
      </form>

      <div>Already Signup? <NavLink to='/login' className='font-medium text-blue-950'><u>Login</u></NavLink> </div>

    </div>
  );
};

export default SignUp;
