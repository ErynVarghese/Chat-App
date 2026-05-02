import { useState, useEffect } from "react";

import MessageInput from "./MessageInput.jsx";
import Messages from "./Messages.jsx";
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
    <section className="flex min-h-full flex-1 flex-col bg-slate-900 text-white rounded-r-3xl p-4 shadow-lg md:min-w-[0]">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="mb-2 rounded-t-2xl bg-slate-800 px-4 py-3 text-white shadow-sm">
            <span className="block text-sm text-slate-400">Chatting with</span>
            <span className="text-xl font-semibold">{selectedConversation.name}</span>
          </div>
          <div className="flex-1 overflow-hidden rounded-2xl border border-slate-700 bg-slate-950">
            <Messages />
          </div>
          <MessageInput />
        </>
      )}
    </section>
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
