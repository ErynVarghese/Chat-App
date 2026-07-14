import { useState, useRef, useEffect } from "react";
import { BsSend } from "react-icons/bs";
import { useUserContext } from "@/context/UserContext.js";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const timeoutRef = useRef(null);
	const { loading, sendMessage, socket, selectedConversation, user } = useUserContext();

	const emitTyping = (isTyping) => {
		const receiverId = selectedConversation?.otherParticipant?._id;

		if (!socket || !receiverId || !user?._id) return;

		socket.emit("typing", {
			senderId: user._id,
			receiverId,
			isTyping,
		});
	};

	const handleChange = (e) => {
		const value = e.target.value;
		setMessage(value);

		if (!value.trim()) {
			emitTyping(false);
			clearTimeout(timeoutRef.current);
			return;
		}

		emitTyping(true);
		clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => emitTyping(false), 800);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message.trim()) return;
		await sendMessage(message.trim());
		setMessage("");
		emitTyping(false);
		clearTimeout(timeoutRef.current);
	};

	useEffect(() => {
		return () => {
			emitTyping(false);
			clearTimeout(timeoutRef.current);
		};
	}, [selectedConversation?._id, socket]);

	return (
		<form className='shrink-0 px-4 my-3' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
					value={message}
					onChange={handleChange}
				/>
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;