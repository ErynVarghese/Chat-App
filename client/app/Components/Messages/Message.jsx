import { useUserContext } from "@/context/UserContext";
import { extractTime } from "@/hooks/extractTime";

const Message = ({ message }) => {
  const { user, selectedConversation } = useUserContext();

  const fromMe = message.senderId === user._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? user.photo : selectedConversation?.photo;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-300";

  return (
    <div className={`chat ${chatClassName} flex items-start gap-3 mb-2`}>
     
      {!fromMe && (
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="User Profile" src={profilePic} />
          </div>
        </div>
      )}

 
      <div className={`chat-bubble text-white ${bubbleBgColor} p-3 rounded-lg`}>
        {message.message}
      </div>

      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center justify-end">
        {formattedTime}
      </div>

    
      {fromMe && (
        <div className="chat-image avatar ml-auto">
          <div className="w-10 rounded-full">
            <img alt="User Profile" src={profilePic} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
