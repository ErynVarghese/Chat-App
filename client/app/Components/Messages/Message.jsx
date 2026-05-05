import { useUserContext } from "@/context/UserContext";
import { extractTime } from "@/hooks/extractTime";

const Message = ({ message }) => {
  const { user, selectedConversation } = useUserContext();

  const fromMe = message.senderId === user._id;
  const formattedTime = extractTime(message.createdAt);
  const otherName = selectedConversation?.otherParticipant?.name || "User";
  const initials = otherName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const profilePic = fromMe ? user.photo : selectedConversation?.otherParticipant?.photo;
  const myProfilePic = user?.photo;
  const otherProfilePic = selectedConversation?.otherParticipant?.photo;

  const getAvatarSeed = (item) => item?.email || item?.name || "User";
  const otherAvatarSeed = getAvatarSeed(selectedConversation?.otherParticipant);
  const myAvatarSeed = getAvatarSeed(user);

  const bubbleClasses = fromMe
    ? "bg-blue-500 text-white rounded-3xl rounded-br-none"
    : "bg-slate-700 text-slate-100 rounded-3xl rounded-bl-none";

  return (
    <div className={`flex ${fromMe ? "justify-end" : "justify-start"} px-3 py-1`}>
      {!fromMe && (
        <div className="mr-2 mt-auto h-10 w-10 overflow-hidden rounded-full bg-slate-700">
          <img
            className="h-full w-full object-cover"
            src={
              otherProfilePic ||
              `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(otherAvatarSeed)}`
            }
            alt={`${selectedConversation?.otherParticipant?.name || "User"} avatar`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(otherAvatarSeed)}`;
            }}
          />
        </div>
      )}

      <div className="max-w-[80%]">
        <div className={`${bubbleClasses} p-4 shadow-lg`}>
          <p className="whitespace-pre-wrap break-words text-sm leading-6">{message.message}</p>
        </div>
        <div className={`mt-1 text-[11px] ${fromMe ? "text-right text-slate-300" : "text-left text-slate-400"}`}>
          <span>{formattedTime}</span>
          {fromMe && (
            <span className="ml-2 text-[10px] font-semibold text-slate-400">
              {message.isRead ? "Read" : "Sent"}
            </span>
          )}
        </div>
      </div>

      {fromMe && (
        <div className="ml-2 mt-auto h-10 w-10 overflow-hidden rounded-full bg-blue-600">
          <img
            className="h-full w-full object-cover"
            src={
              myProfilePic ||
              `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(myAvatarSeed)}`
            }
            alt={`${user?.name || "Me"} avatar`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(myAvatarSeed)}`;
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Message;
