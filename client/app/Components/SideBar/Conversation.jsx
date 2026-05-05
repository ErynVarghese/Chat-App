import { useUserContext } from "@/context/UserContext.js";



const Conversation = ({ conversation, lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation, onlineUsers } = useUserContext();

	const { conversationId, otherParticipant, lastMessage, updatedAt, isGroup, groupName, participants } = conversation;

	const itemId = conversationId || otherParticipant?._id;

	const selectedId =
		selectedConversation?.conversationId ||
		selectedConversation?.otherParticipant?._id;

	const isSelected = itemId === selectedId;

	const displayName = isGroup ? groupName : otherParticipant?.name;
	const displaySub = lastMessage?.message || (isGroup ? `${participants?.length} members` : otherParticipant?.email);

	const isOnline = !isGroup && onlineUsers.includes(otherParticipant?._id?.toString());
	const avatarSeed = otherParticipant?.email || otherParticipant?.name || groupName || conversationId;
	const avatarUrl = otherParticipant?.photo || `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(avatarSeed)}`;

	return (
		<>
			<div
				className={`flex gap-3 items-center rounded p-2 py-1 cursor-pointer transition-colors duration-200 ${isSelected ? "bg-sky-500" : "hover:bg-slate-800"}`}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div className='relative h-11 w-11 overflow-hidden rounded-full bg-slate-700'>
					<img
						className='h-full w-full object-cover'
						src={avatarUrl}
						alt={`${otherParticipant?.name} avatar`}
						onError={(e) => {
						e.target.onerror = null;
						e.target.src = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(avatarSeed)}`;
					}}
					/>
					<span className={`absolute bottom-0 end-0 h-3 w-3 rounded-full border-2 border-slate-900 ${isOnline ? "bg-emerald-400" : "bg-slate-500"}`} />
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex flex-col'>
						<p className='font-semibold text-slate-100'>{displayName}</p>
						<p className='text-sm text-slate-400 line-clamp-1'>
						{displaySub}
					</p>
					</div>
				{updatedAt && (
					<p className='mt-1 text-xs text-slate-500'>
						{new Date(updatedAt).toLocaleTimeString(undefined, {
							hour: "2-digit",
							minute: "2-digit",
						})}
					</p>
				)}
			</div>
</div>
			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};
export default Conversation;