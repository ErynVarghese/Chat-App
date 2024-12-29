"use client";

import { useUserContext } from "@/context/UserContext";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface ResetFormProps {
  resetToken: string;
}

const ResetForm = ({ resetToken }: ResetFormProps) => {

  const { PasswordReset } = useUserContext();


  const [showPassword, setShowPassword] = useState(false);

  // Store the new password in password field
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    
    PasswordReset(resetToken, password);
  };

  return (
    <form
      className="flex flex-col gap-6 w-full max-w-lg mx-auto mt-10 p-8 bg-white border border-blue-300 rounded-md shadow-md"
      onSubmit={handleSubmit}
    >
      <h1 className="text-center text-2xl font-bold text-blue-700">
        Reset Your Password
      </h1>
      <p className="text-center text-sm text-blue-600">
        Enter your new password below.
      </p>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-blue-600 font-medium">
          New Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={handlePasswordChange}
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
        <label htmlFor="confirmPassword" className="text-blue-600 font-medium">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
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
        Reset Password
      </button>
    </form>
  );
};

export default ResetForm;
