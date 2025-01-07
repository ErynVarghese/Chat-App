import React, { createContext, useContext, useState } from 'react';

const ConversationContext = createContext();

export const ConversationProvider = ({ children }) => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  return (
    <ConversationContext.Provider value={{ selectedConversation, setSelectedConversation }}>
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => useContext(ConversationContext);
