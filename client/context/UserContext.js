import React, {createContext, useEffect, useState, useContext} from 'react';
import { io } from "socket.io-client";

import axios from 'axios';

import {useRouter} from "next/navigation";

import toast from "react-hot-toast";

// User Context
const UserContext = React.createContext();

axios.defaults.withCredentials = true; 

export const UserContextProvider = ({children}) => {

    const serverUrl = "http://localhost:8000";

    //next.js router
    const router = useRouter();

    // logged-in user detals throughout a session 
    const [user, setUser] = useState({});

    const [allUsers, setAllUsers] = useState([]);

    // temporary for form fields (login or registration)
    const [userState, setUserState] = useState({
        name : "",
        email : "",
        password : "",
    })

    const [loading, setLoading] = useState(false);


    const RegisterUser = async (e) => {

        e.preventDefault();

        // validation toast
        if(!userState.email.includes("@") || !userState.password || userState.password.length < 8){
            toast.error("Please fill all fields");
            return;
        }


        try {

            // POST request 
            const res = await axios.post (`${serverUrl}/api/v1/register`, userState);
            
   
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
 

    const LoginUser = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${serverUrl}/api/v1/login`, {
                
                email: userState.email,
                password: userState.password,
            }, {
                withCredentials: true,
            });

            toast.success("User logged in successfully!");

            setUserState({
                email: "",
                password: "",
                
            });

            router.push("/");

            
        } catch (error) {
            console.log("Error logging  user", error);
            toast.error(error.response.data.message);
        }
    }

    const userLoginStatus = async () => {
        let LogIn = false;
        try {
            const res = await axios.get(`${serverUrl}/api/v1/login-status`, {
                withCredentials: true,
            });

            LogIn = !!res.data
            
            setLoading(false);

            if(!LogIn){
                router.push("/login");
            }

        } catch (error) {
            console.log("Error checking login status", error);
           // setLoading(false);
           // router.push("/login");            
        }

        console.log("Logged in?" , LogIn)
        return LogIn;
    }


    const LogoutUser = async () => {
        try {
            const res = await axios.get(`${serverUrl}/api/v1/logout`, {
                withCredentials: true,
            });

            toast.success("User logged out successfully!");

            router.push("/login");
        } catch (error){

            console.log("Error logging out user", error);
            toast.error(error.response.data.message);
            router.push("/login");
        } 
    };

    const GetUser = async () => {

        setLoading(true);

        try {
            
            const res = await axios.get(`${serverUrl}/api/v1/user`, {
                withCredentials: true,
            });

            setUser((prevState) => {
                return {
                   ...prevState,
                   ...res.data,
                };
            });

            setLoading(false);

        } catch (error) {
            console.log("Ërror fetching user details", error);
            setLoading(false);
            toast.error(error.response.data.message);
        }
    };

    const updateUser = async(e,data) =>{
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.patch(`${serverUrl}/api/v1/user`,data, {
                withCredentials: true,
            });

            setUser((prevState) => ({
                ...prevState,
                ...res.data,
            }));

            toast.success("User details updated successfully!");

            setLoading(false);

        } catch (error) {
            
            console.log("Error updating user details", error);
            setLoading(false);
            toast.error(error.response.data.message);
        }

    };

    const emailVerification = async () => {
        console.log("Email verification triggered"); 
        setLoading(true);
        
        try {
            const res = await axios.post(`${serverUrl}/api/v1/verify-email`, {}, {
                withCredentials: true, 
            });

        toast.success("Email verification successful!");
        setLoading(false);
            
        } catch (error) {
            console.log("Error in email verification", error);

            setLoading(false);
            toast.error(error.response.data.message);
        }
    };


    const verifyUser = async (token) => {
        setLoading(true);

        try {
            const res = await axios.post(`${serverUrl}/api/v1/verify-user/${token}` ,
            {} , {
                withCredentials: true,
            }
        );

        toast.success("User verified successfully!");
        GetUser();
        setLoading(false);

        router.push("/");
        
        } catch (error) {
            console.log("Error verifying user", error);
            setLoading(false);
            toast.error(error.response.data.message);
            
        }
    }

    const ForgotPassword = async (email) => {

        setLoading(true);

        try {
            
            const res = await axios.post(`${serverUrl}/api/v1/forgot-password`, {
                email,
            }, {
                withCredentials: true,
            });

            toast.success("Password reset link sent to your email!");
            setLoading(false);

        } catch (error) {
            console.log("Error in forgot password", error);
            setLoading(false);
            toast.error(error.response.data.message);
            
        }
    }

    const PasswordReset = async (token , password) => {

        setLoading(true);

        try {
            
            const res = await axios.post(`${serverUrl}/api/v1/reset-password/${token}`, {
                password,
            }, {
                withCredentials: true,
            });

            toast.success("Password reset successful!");
            router.push("/login");
            setLoading(false);

        } catch (error) {
            
            console.log("Error in password reset", error);
            setLoading(false);
            toast.error(error.response.data.message);
        }
    };

    const changePassword = async (CurrentPassword, NewPassword) => {
        setLoading(true);
        
        try {
            
            const res = await axios.patch(`${serverUrl}/api/v1/change-password`,{CurrentPassword, NewPassword} ,{withCredentials: true});
            
            toast.success("Password changed successfully!");
            setLoading(false);

        } catch (error) {
            
            console.log("Error in changing password", error);
            setLoading(false);
            toast.error(error.response.data.message);
        }
    };

    const getAllUsers = async() => {
        setLoading(true);

        try {
            
            const res = await axios.get(`${serverUrl}/api/v1/admin/users`,{}, {
                withCredentials: true,
            });


            const data = await res.json();
            console.log("Data", data);  
            
        } catch (error) {

            console.log("Error in getting all users", error);
            setLoading(false);
            toast.error(error.response.data.message);
        }

    };

    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);

   
    const [conversations, setConversations] = useState([]);


   // Function to get messages
  const getMessages = async () => {
    if (!selectedConversation?._id) return;
    setLoading(true);
    try {
      const res = await fetch(`${serverUrl}/api/v1/messages/${selectedConversation._id}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages(data); 
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    getMessages();
  }, [selectedConversation]);

  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (user) {
        const socket = io("http://localhost:3000", {
            query: {
                userId: user._id,
            },
        });

        setSocket(socket);

        
        socket.on("getOnlineUsers", (users) => {
            setOnlineUsers(users);
        });

        return () => socket.close();
    } else {
        if (socket) {
            socket.close();
            setSocket(null);
        }
    }
}, [user]);



     // sendMessage function
  const sendMessage = async (message) => {
    if (!selectedConversation) {
      toast.error("No conversation selected");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/v1/messages/send/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

     
      setMessages((prevMessages) => [...prevMessages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
   
  
    // Fetch conversations on component mount
    useEffect(() => {
      const getConversations = async () => {
        setLoading(true);
        try {
          const res = await fetch("http://localhost:8000/api/v1/users");
          const data = await res.json();
          console.log("Data", data);
          if (data.error) {
            throw new Error(data.error);
          }
          setConversations(data);
        } catch (error) {
            console.log(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      getConversations();
    }, []);

    // update the fields in UserState
    const updateUserState = (name) => (e) => {
        const value = e.target.value;

        setUserState((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    useEffect(() => {

        const GetuserLogin = async () => {
            const isLogIn = await userLoginStatus();
            console.log("Is logged in", isLogIn);

            if(isLogIn){
                await GetUser();
            }
        };

        GetuserLogin();
            
    }, []);

    useEffect(() => {
       
        if (user.role == "admin"){
            getAllUsers();
        }
    }, [user.role]);

    return (
        <UserContext.Provider value= {{
            RegisterUser, 
            userState,
            updateUserState,
            LoginUser, 
            LogoutUser,
            userLoginStatus,
            user,
            updateUser,
            emailVerification,
            verifyUser,
            ForgotPassword,
            PasswordReset,
            changePassword,
            selectedConversation,
            setSelectedConversation,
            messages,
            setMessages,
            conversations,
            setConversations,
            sendMessage,            
            allUsers,
            getMessages,
            socket,
            onlineUsers,        	
        }}>
            {children}
        </UserContext.Provider>
       
    );
};

// Custom hook to access user context - next time you dont have to import UseContext again
export const useUserContext = () => {
    return useContext(UserContext);
}