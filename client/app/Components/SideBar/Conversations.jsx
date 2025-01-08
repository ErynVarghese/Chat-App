import Conversation from "./Conversation.jsx";
import { useUserContext } from "@/context/UserContext.js";



const Conversations = () => { 
	const { loading, conversations } = useUserContext();

	console.log("User Context:", { loading, conversations });


	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
				
					lastIdx={idx === conversations.length - 1}
				/>
			))}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default Conversations;