"use client";

import { useUserContext } from "@/context/UserContext";
import React from "react";

function ForgotPasswordForm() {
  const { ForgotPassword } = useUserContext();

 
  const [email, setEmail] = React.useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ForgotPassword(email);    
    setEmail("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full max-w-lg mx-auto mt-10 p-8 bg-white border border-blue-300 rounded-md shadow-md"
    >
      <h1 className="text-center text-2xl font-bold text-blue-700">
        Enter email to reset password
      </h1>

      <div className="text-center text-sm text-blue-600">
        Remembered your password?{" "}
        <a
          href="/login"
          className="font-bold text-blue-700 hover:underline"
        >
          Login here
        </a>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-blue-600 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="eryn@gmail.com"
          className="p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      </div>

      <button
        type="submit"
        disabled={!email}
        className="w-full p-3 text-white font-bold bg-blue-600 rounded-md hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Reset Password
      </button>
    </form>
  );
}

export default ForgotPasswordForm;
