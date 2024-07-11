import React, { useEffect, useState } from "react";
import { signOut } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const Profile = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    phoneNumber: "",
    email: "",
    gender: "",
    age: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    }
  }, []);

  const handleLogOut = () => {
    dispatch(signOut());
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 h-[82.4vh]">
      <h1 className="text-center text-4xl font-bold mb-8 text-[#1D7C53] cursor-pointer">
        Profile
      </h1>
      <div className="bg-[#D1EDE1] p-8 text-center rounded-2xl shadow-lg w-full max-w-sm space-y-6 cursor-pointer">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold text-[#1D7C53]">Name:</h2>
          <p className="text-gray-800 capitalize text-xl">{`${user.firstname} ${user.lastname}`}</p>
        </div>
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold text-[#1D7C53]">
            Phone Number:
          </h2>
          <p className="text-gray-800 text-xl">{user.phoneNumber}</p>
        </div>
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold text-[#1D7C53]">Email:</h2>
          <p className="text-gray-800 text-xl">{user.email}</p>
        </div>
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold text-[#1D7C53]">Gender:</h2>
          <p className="text-gray-800 capitalize text-xl">{user.gender}</p>
        </div>
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold text-[#1D7C53]">Age:</h2>
          <p className="text-gray-800 text-xl">{user.age}</p>
        </div>
      </div>
      <button
        onClick={handleLogOut}
        className="mt-8 bg-[#FE736D] hover:bg-red-600 text-white font-bold py-2 px-6 rounded-md transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
