import { useUserContext } from "@/context/UserContext";
import { extractTime } from "@/hooks/extractTime";

const Message = ({ message }) => {
  const { user, selectedConversation } = useUserContext();

  const fromMe = message.senderId === user._id;
  const formattedTime = extractTime(message.createdAt);
  const otherName = selectedConversation?.name || "User";
  const initials = otherName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const profilePic = fromMe ? user.photo : selectedConversation?.photo;
  const hasProfileImage = profilePic && profilePic.trim() !== "";

  const bubbleClasses = fromMe
    ? "bg-blue-500 text-white rounded-3xl rounded-br-none"
    : "bg-slate-700 text-slate-100 rounded-3xl rounded-bl-none";

  return (
    <div className={`flex ${fromMe ? "justify-end" : "justify-start"} px-3 py-1`}>
      {!fromMe && (
        <div className="mr-2 mt-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-white">
          {hasProfileImage ? (
            <img className="h-10 w-10 rounded-full object-cover" src={profilePic} alt="Avatar" />
          ) : (
            <span>{initials}</span>
          )}
        </div>
      )}

      <div className="max-w-[80%]">
        <div className={`${bubbleClasses} p-4 shadow-lg`}>
          <p className="whitespace-pre-wrap break-words text-sm leading-6">{message.message}</p>
        </div>
        <div className={`mt-1 text-[11px] ${fromMe ? "text-right text-slate-300" : "text-left text-slate-400"}`}>
          {formattedTime}
        </div>
      </div>

      {fromMe && (
        <div className="ml-2 mt-auto flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
          {hasProfileImage ? (
            <img className="h-10 w-10 rounded-full object-cover" src={profilePic} alt="Avatar" />
          ) : (
            <span>{(user.name || "Me").slice(0, 2).toUpperCase()}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Message;
