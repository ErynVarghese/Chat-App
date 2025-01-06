import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const ConversationContext = createContext();

export const ConversationProvider = ({ children }) => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMessages = async () => {
      if (selectedConversation?._id) {
        setLoading(true);
        try {
          const res = await fetch(`/api/messages/${selectedConversation._id}`);
          const data = await res.json();
          if (data.error) throw new Error(data.error);
          setMessages(data);
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    getMessages();
  }, [selectedConversation]);

  return (
    <ConversationContext.Provider value={{
      selectedConversation,
      setSelectedConversation,
      messages,
      setMessages,
      loading,
      setLoading,
    }}>
      {children}
    </ConversationContext.Provider>
  );
};

// Custom hook to access conversation context
export const useConversationContext = () => {
  const context = useContext(ConversationContext);

  if (!context) {
    throw new Error("useConversationContext must be used within a ConversationProvider");
  }

  return context;
};
