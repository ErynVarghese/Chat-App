import { useUserContext } from "@/context/UserContext.js";



const Conversation = ({ conversation, lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useUserContext();

	const isSelected = selectedConversation?._id === conversation._id;
	const avatarSeed = conversation.email || conversation.name || conversation._id;
	const avatarUrl = conversation.photo || `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(avatarSeed)}`;

	return (
		<>
			<div
				className={`flex gap-3 items-center rounded p-2 py-1 cursor-pointer transition-colors duration-200 ${isSelected ? "bg-sky-500" : "hover:bg-slate-800"}`}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div className='h-11 w-11 overflow-hidden rounded-full bg-slate-700'>
					<img
						className='h-full w-full object-cover'
						src={avatarUrl}
						alt={`${conversation.name} avatar`}
						onError={(e) => {
						e.target.onerror = null;
						e.target.src = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(avatarSeed)}`;
					}}
					/>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex flex-col'>
						<p className='font-semibold text-slate-100'>{conversation.name}</p>
						<p className='text-sm text-slate-400'>{conversation.email}</p>
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};
export default Conversation;