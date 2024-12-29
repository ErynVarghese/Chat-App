"use client";


import { useUserContext } from "@/context/UserContext";
import React from "react";

interface Props {
  params: {
    verificationToken: string;
  };
}

function page({ params }: Props) {
  const { verificationToken } =  params;

  const { verifyUser } = useUserContext();

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-blue-50">
      <form className="flex flex-col gap-6 w-full max-w-lg mx-auto p-8 bg-white border border-blue-300 rounded-md shadow-md">
        <h1 className="text-center text-2xl font-bold text-blue-700">
          Verify Your Account
        </h1>
        <p className="text-center text-sm text-blue-600">
          Click the button below to verify your account.
        </p>

        <button
          type="button"
          onClick={() => verifyUser(verificationToken)}
          className="w-full p-3 text-white font-bold bg-blue-600 rounded-md hover:bg-blue-700 transition-all"
        >
          Verify Account
        </button>
      </form>
    </div>
  );
}

export default page;
