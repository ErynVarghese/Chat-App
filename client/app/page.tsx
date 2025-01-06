"use client";

import { useUserContext } from "@/context/UserContext";
import ChangePasswordForm from "./Components/auth/ChangePasswordForm/ChangePasswordForm";
import Sidebar from "./Components/SideBar/SideBar";
import ChatContainer from "./Components/Messages/ChatContainer";


// Home page 
export default function Home(){


  return( 

    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
    <Sidebar />
    <ChatContainer />
  </div>


  );
};


