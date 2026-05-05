import Conversation from "./Conversation.jsx";
import { useUserContext } from "@/context/UserContext.js";



const Conversations = () => { 
	const { loading, conversations, searchQuery } = useUserContext();

	const normalizedSearch = searchQuery?.trim().toLowerCase() || "";
	const filteredConversations = conversations.filter((conversation) => {
		if (!normalizedSearch) return true;
		const nameMatch = conversation.name?.toLowerCase().includes(normalizedSearch);
		const emailMatch = conversation.email?.toLowerCase().includes(normalizedSearch);
		return nameMatch || emailMatch;
	});

	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{filteredConversations.length > 0 ? (
				filteredConversations.map((conversation, idx) => (
					<Conversation
						key={conversation._id}
						conversation={conversation}
						lastIdx={idx === filteredConversations.length - 1}
					/>
				))
			) : !loading ? (
				<div className='mx-auto mt-6 text-sm text-slate-400'>
					No users match your search.
				</div>
			) : null}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default Conversations;