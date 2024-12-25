import React, {createContext, useEffect, useState, useContext} from 'react';

import {useRouter} from "next/navigation";

import toast from "react-hot-toast";

// User Context
const UserContext = React.createContext();


export const UserContextProvider = ({children}) => {

    const serverUrl = "http://localhost:8000";

    //next.js router
    const router = useRouter();

    // logged-in user detals throughout a session 
    const [user, setUser] = useState(null);

    // temporary for form fields (login or registration)
    const [userState, setUserState] = useState({
        name : "",
        email : "",
        password : "",
    })

    const [loading, setLoading] = useState(true);


    const RegisterUser = async (e) => {

        e.preventDefault();

        // validation toast
        if(!userState.email.includes("@") || !userState.password || !userState.password.length < 8){
            toast.error("Please fill all fields");
            return;
        }


        try {

            // POST request 
            const res = await axios.post ('{serverUrl}/api/v1/register', userState);
            console.log(res.data);
            toast.success("Registration successful!");

            setUserState({
                name: "",
                email: "",
                password: "",                
            });

            // redirect to login page 
            router.push('/login');

        } catch (error) {
           console.log("Error registering user", error);
           toast.error(error.response.data.message);
        }
    }

    // update the fields in UserState
    const updateUserState = (name) => (e) => {
        const value = e.target.value;

        setUserState((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    return (
        <UserContext.Provider value= {{
            RegisterUser, 
            userState,
            updateUserState
        }}>
            {children}
        </UserContext.Provider>
       
    );
};

// Custom hook to access user context - next time you dont have to import UseContext again
export const useUserContext = () => {
    return useContext(UserContext);
}