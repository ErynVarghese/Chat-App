import { useUserContext } from "@/context/UserContext.js";



const Conversation = ({ conversation, lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useUserContext();

	const isSelected = selectedConversation?._id === conversation._id;
	console.log(isSelected);
	//const { onlineUsers } = useSocketContext();
	//const isOnline = onlineUsers.includes(conversation._id);

	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
				onClick={() => setSelectedConversation(conversation)}
			>


				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-black-200'>{conversation.name}</p>			
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};
export default Conversation;