import { useState } from "react";

const useConversation = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  return {
    selectedConversation,
    setSelectedConversation,
    messages,
    setMessages,
  };
};

export default useConversation;
