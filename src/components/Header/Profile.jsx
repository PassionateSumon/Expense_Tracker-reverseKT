import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    phoneNumber: "",
    email: "",
    gender: "",
    age: ''
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    }
  }, []);

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 h-[82.4vh] ">
      <h1 className="text-center text-3xl font-bold mb-6">Profile</h1>
      <div className="bg-slate-400 p-6 text-center rounded-2xl shadow-lg w-full max-w-md space-y-4">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-semibold">Name:</h2>
          <p className="text-gray-800 capitalize">{`${user.firstname} ${user.lastname}`}</p>
        </div>
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-semibold">Phone Number:</h2>
          <p className="text-gray-800">{user.phoneNumber}</p>
        </div>
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-semibold">Email:</h2>
          <p className="text-gray-800">{user.email}</p>
        </div>
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-semibold">Gender:</h2>
          <p className="text-gray-800 capitalize">{user.gender}</p>
        </div>
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-semibold">Age:</h2>
          <p className="text-gray-800">{user.age}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
