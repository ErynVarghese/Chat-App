import React from 'react'
import RegisterForm from '../Components/auth/RegisterForm/RegisterForm';

function page() {
  return (
    <div className="login-page min-h-screen w-full flex items-center justify-center px-4 py-10">
      <RegisterForm />
    </div>
  )
}

export default page;