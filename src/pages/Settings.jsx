import React, { useState } from "react";
import axios from "axios";

const Settings = () => {
  const backendUrl = "https://hostel-bank-be-deepsalunkhee.vercel.app";

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (newPassword !== confirmPassword) {
      alert("New and Confired does not match");
      return;
    }

    try {
      const reqchangePassword = await axios(
        `${backendUrl}/users/changepassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          data: {
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
            email: email,
          },
        }
      );
      if (reqchangePassword.status === 200) {
        alert("Password changed successfully");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <div >
        <h1 className="text-2xl font-bold mb-4">Change Password</h1>
        <form className="space-y-4">
          <input
            type="password"
            placeholder="Old Password"
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="New Password"
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <button
            className="block w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={handleChangePassword}
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
