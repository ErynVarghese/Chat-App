"use client";

import { useUserContext } from "@/context/UserContext";

import React from "react";

function RegisterForm() {
   const { RegisterUser, userState, updateUserState } = useUserContext();

   // Destructuring user state values
   const { name, email, password } = userState;

   const [showPassword, setShowPassword] = React.useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <form className="flex flex-col gap-6 w-full max-w-lg mx-auto mt-10 p-8 bg-white border border-blue-300 rounded-md shadow-md">
      <h1 className="text-center text-2xl font-bold text-blue-700">
        Create Your Account
      </h1>
      <div className="text-center text-sm text-blue-600">
        Already have an account?{" "}
        <a
          href="/login"
          className="font-bold text-blue-700 hover:underline"
        >
          Login here
        </a>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-blue-600 font-medium">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => updateUserState("name")(e)}
          placeholder="Eryn Renchi Varghese"
          className="p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-blue-600 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => updateUserState("email")(e)}
          placeholder="eryn@gmail.com"
          className="p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-blue-600 font-medium">
          Password
        </label>
        <div className="relative">
          <input
           // type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => updateUserState("password")(e)}
            placeholder="***************"
            className="p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white w-full"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 font-medium"
            onClick={togglePassword}
          >
            {showPassword ? (
              <i className="fas fa-eye-slash" onClick={togglePassword}></i>
            ) : (
              <i className="fas fa-eye" onClick={togglePassword}></i>
            )}


          </button>
        </div>
      </div>

      <button
        type="submit"
        onClick={RegisterUser}
        disabled={!name || !email || !password}
        className="w-full p-3 text-white font-bold bg-blue-600 rounded-md hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Register Now
      </button>
    </form>
  );
}

export default RegisterForm;
