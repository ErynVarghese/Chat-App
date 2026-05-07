"use client";

import ResetForm from "@/app/Components/auth/ResetForm/ResetForm";
import { useParams } from "next/navigation";
import React from "react";

function Page() {
  const params = useParams();
  const resetToken = params.resetToken as string;

  return (
    <div className="login-page w-full h-full flex justify-center items-center">
      <ResetForm resetToken={resetToken} />
    </div>
  );
}

export default Page;