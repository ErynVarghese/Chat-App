"use client";

import { useUserContext } from "@/context/UserContext";

// Home page 
export default function Home(){

  

  const {
    logoutUser,
    user, 
    handlerUserInput,
    userState,
    updateUser,
    emailVerification,
  } = useUserContext();

  return( <div>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              
              onClick={emailVerification}
             
            >
              Verify Account
             
            </button>
  </div>
  )
}

// use the userredirect hook in main page
