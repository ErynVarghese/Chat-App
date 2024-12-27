"use client"

import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


// if not logged in -> redirect to "redirect"
const useRedirect = (redirect: string) => {

    // use the useUserContext hook to access the userLoginStatus function from the user context
    const {userLoginStatus} = useUserContext();
    const router = useRouter();

    useEffect(() => {

        const redirectUser = async () => {

        try {
            const isLogIn = await userLoginStatus();
            console.log("User logged in?", isLogIn);

            if (!isLogIn) {
                router.push(redirect);
            }
            
        } catch (error) {

            console.log("Error in redirecting user", error);
            
        }
    };

        redirectUser();
    
    } ,
    // re-run if one or more dependencies in the array change
     [ redirect, userLoginStatus , router]);  // dependency array
    };


    export default useRedirect;
