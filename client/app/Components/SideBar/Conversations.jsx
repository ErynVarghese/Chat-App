import Conversation from "./Conversation.jsx";
import GroupModal from "./GroupModal.jsx";
import { useUserContext } from "@/context/UserContext.js";
import { useState, useEffect } from "react";
import { MdGroupAdd } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

const Conversations = () => {
	const { loading, conversations, searchQuery, user, fetchConversations, setSearchQuery } = useUserContext();
	const [searchUsers, setSearchUsers] = useState([]);
	const [showGroupModal, setShowGroupModal] = useState(false);

	useEffect(() => {
		if (searchQuery.trim()) {
			const fetchUsers = async () => {
				try {
					const res = await axios.get(
						`http://localhost:8000/api/v1/users/search?query=${searchQuery}`,
						{ withCredentials: true }
					);
					const filteredUsers = res.data.filter(u => u._id !== user._id);
					setSearchUsers(filteredUsers);
				} catch (error) {
					console.error(error);
				}
			};
			fetchUsers();
		} else {
			setSearchUsers([]);
		}
	}, [searchQuery, user]);

	const handleSearchUserClick = async (selectedUser) => {
		try {
			await axios.post(
				`http://localhost:8000/api/v1/conversations/direct`,
				{ receiverId: selectedUser._id },
				{ withCredentials: true }
			);
			toast.success(`Direct chat with ${selectedUser.name} created`);
			setSearchQuery("");
			fetchConversations();
		} catch (error) {
			toast.error("Failed to create direct chat");
		}
	};

	const normalizedSearch = searchQuery?.trim().toLowerCase() || "";
	const filteredConversations = conversations.filter((conversation) => {
		if (!normalizedSearch) return true;
		const nameMatch = conversation.otherParticipant?.name?.toLowerCase().includes(normalizedSearch);
		const emailMatch = conversation.otherParticipant?.email?.toLowerCase().includes(normalizedSearch);
		const lastMessageMatch = conversation.lastMessage?.message?.toLowerCase().includes(normalizedSearch);
		return nameMatch || emailMatch || lastMessageMatch;
	});

	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{/* Add Group Button */}
			<button
				onClick={() => setShowGroupModal(true)}
				className='flex items-center gap-2 mx-2 mb-2 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-medium transition'
			>
				<MdGroupAdd className='w-5 h-5' />
				Add Group
			</button>

			{/* Direct Search Results */}
			{searchQuery.trim() ? (
				<div>
					{searchUsers.length > 0 ? (
						searchUsers.map((u) => (
							<div
								key={u._id}
								onClick={() => handleSearchUserClick(u)}
								className='p-2 hover:bg-slate-800 rounded cursor-pointer'
							>
								<p className='font-semibold text-slate-100'>{u.name}</p>
								<p className='text-sm text-slate-400'>{u.email}</p>
							</div>
						))
					) : (
						<div className='mx-auto mt-4 text-sm text-slate-400'>No users found</div>
					)}
				</div>
			) : (
				/* Existing Conversations */
				filteredConversations.length > 0 ? (
					filteredConversations.map((conversation, idx) => (
						<Conversation
							key={conversation.conversationId}
							conversation={conversation}
							lastIdx={idx === filteredConversations.length - 1}
						/>
					))
				) : !loading ? (
					<div className='mx-auto mt-6 text-sm text-slate-400'>
						No conversations yet. Search for users or create a group to start.
					</div>
				) : (
					<div className='mx-auto mt-6'>
						<span className='loading loading-spinner'></span>
					</div>
				)
			)}

			{/* Group Modal */}
			<GroupModal
				isOpen={showGroupModal}
				onClose={() => setShowGroupModal(false)}
				user={user}
				onGroupCreated={fetchConversations}
			/>
		</div>
	);
};

export default Conversations;