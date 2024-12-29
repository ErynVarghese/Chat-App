"use client";

import ResetForm from '@/app/Components/auth/ResetForm/ResetForm';
import React from 'react';

interface Props {
  params: {
    resetToken: string; // Define resetToken from params
  };
}

function page({ params: { resetToken } }: Props) {
  return (
    <div className="login-page w-full h-full flex justify-center items-center">
      <ResetForm resetToken={resetToken} />
    </div>
  );
}

export default page;
