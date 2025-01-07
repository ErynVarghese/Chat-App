import { useEffect, useRef } from "react";

import Message from "./Message.jsx";

import { useUserContext } from "@/context/UserContext.js";

const Messages = () => {
    const { messages, loading, getMessages, selectedConversation } = useUserContext();
 
  const lastMessageRef = useRef();

  useEffect(() => {
    if (selectedConversation) {
      getMessages(); 
    }
  }, [selectedConversation, getMessages]);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading ? (
        <p className="text-center">Loading...</p> 
      ) : messages.length > 0 ? (
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))
      ) : (
        <p className="text-center">Send a message to start the conversation</p> 
      )}
    </div>
  );
};

export default Messages;
