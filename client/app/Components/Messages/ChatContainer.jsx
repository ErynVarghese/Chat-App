import { useState, useEffect } from "react";

import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useUserContext } from "@/context/UserContext.js";


const MessageContainer = () => {
  const { user } = useUserContext();
  const { selectedConversation, setSelectedConversation } = useUserContext();

  console.log("1", selectedConversation);

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, []);

  return (
    <div className="md:min-w-[450px] flex flex-col bg-gray-900 text-white rounded-lg shadow-lg">

      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2 rounded-t-lg">
            <span className="label-text">To:</span>
            <span className="text-gray-900 font-bold">
              {selectedConversation ? selectedConversation.name : "Loading..."}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-800 rounded-lg">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center text-gray-500" />
      </div>
    </div>
  );
};
