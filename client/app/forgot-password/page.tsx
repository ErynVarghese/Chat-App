import React from 'react'
import ForgotPasswordForm from '../Components/auth/ForgotPasswordForm/ForgotPasswordForm'

function page() {
    return (
        <div className="login-page min-h-screen w-full flex items-center justify-center px-4 py-10">
          <ForgotPasswordForm />
        </div>
      )
}

export default page