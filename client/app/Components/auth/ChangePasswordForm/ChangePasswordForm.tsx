"use client";

import { useUserContext } from "@/context/UserContext";
import React, { useState } from "react";
import toast from "react-hot-toast";

function ChangePasswordForm() {
  const { changePassword } = useUserContext();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const currentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
  };

  const newPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword) {
      toast.error("Please fill in all fields!");
      return;
    }

    changePassword(currentPassword, newPassword);

    
  };

  return (
    <form
      className="flex flex-col gap-6 w-full max-w-lg mx-auto mt-10 p-8 bg-white border border-blue-300 rounded-md shadow-md"
      onSubmit={handleSubmit}
    >
      <h1 className="text-center text-2xl font-bold text-blue-700">
        Change Your Password
      </h1>
      <p className="text-center text-sm text-blue-600">
        Update your password securely.
      </p>

      <div className="flex flex-col gap-2">
        <label htmlFor="currentPassword" className="text-blue-600 font-medium">
          Current Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="currentPassword"
            value={currentPassword}
            onChange={currentPasswordChange}
            placeholder="***************"
            className="p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white w-full"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500"
            onClick={togglePassword}
          >
            {showPassword ? (
              <i className="fas fa-eye-slash"></i>
            ) : (
              <i className="fas fa-eye"></i>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="newPassword" className="text-blue-600 font-medium">
          New Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="newPassword"
            value={newPassword}
            onChange={newPasswordChange}
            placeholder="***************"
            className="p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white w-full"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500"
            onClick={togglePassword}
          >
            {showPassword ? (
              <i className="fas fa-eye-slash"></i>
            ) : (
              <i className="fas fa-eye"></i>
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full p-3 text-white font-bold bg-blue-600 rounded-md hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Change Password
      </button>
    </form>
  );
}

export default ChangePasswordForm;
