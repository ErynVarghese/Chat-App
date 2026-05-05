import { useEffect, useRef } from "react";

import Message from "./Message.jsx";

import { useUserContext } from "@/context/UserContext.js";

const Messages = () => {
    const { messages, loading } = useUserContext();
 
  const lastMessageRef = useRef();

  const getDayLabel = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diffDays = Math.round((startOfToday - startOfDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays > 1 && diffDays < 7) return date.toLocaleDateString(undefined, { weekday: "long" });
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  };

  const renderMessages = () => {
    const items = [];
    let lastDateKey = "";

    messages.forEach((message) => {
      const messageDate = new Date(message.createdAt);
      const dateKey = messageDate.toDateString();

      if (dateKey !== lastDateKey) {
        items.push({
          type: "separator",
          key: `separator-${dateKey}`,
          label: getDayLabel(message.createdAt),
        });
        lastDateKey = dateKey;
      }

      items.push({ type: "message", key: message._id, message });
    });

    return items;
  };

  const renderedItems = renderMessages();
  const lastRenderedMessageId = renderedItems
    .filter((item) => item.type === "message")
    .slice(-1)[0]?.message?._id;

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
        renderedItems.map((item) =>
          item.type === "separator" ? (
            <div key={item.key} className="my-4 flex justify-center">
              <span className="rounded-full bg-slate-700 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-slate-300">
                {item.label}
              </span>
            </div>
          ) : (
            <div key={item.key} ref={item.message._id === lastRenderedMessageId ? lastMessageRef : null}>
              <Message message={item.message} />
            </div>
          )
        )
      ) : (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
