import React from 'react'
import LoginForm from '../Components/auth/LoginForm/LoginForm';

function page() {
  return (
    <div className="login-page min-h-screen w-full flex items-center justify-center px-4 py-10">
      <LoginForm />
    </div>
  )
}

export default page;