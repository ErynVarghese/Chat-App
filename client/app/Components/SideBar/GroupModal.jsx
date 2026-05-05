import { useState, useEffect } from "react";
import { IoClose, IoSearchSharp } from "react-icons/io5";
import { MdCheck } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

const GroupModal = ({ isOpen, onClose, user, onGroupCreated }) => {
	const [groupName, setGroupName] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [searchUsers, setSearchUsers] = useState([]);
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (searchQuery.trim()) {
			const fetchUsers = async () => {
				try {
					const res = await axios.get(
						`http://localhost:8000/api/v1/users/search?query=${searchQuery}`,
						{ withCredentials: true }
					);
					const filteredUsers = res.data.filter(u => u._id !== user._id && !selectedUsers.some(selected => selected._id === u._id));
					setSearchUsers(filteredUsers);
				} catch (error) {
					console.error(error);
				}
			};
			fetchUsers();
		} else {
			setSearchUsers([]);
		}
	}, [searchQuery, user._id, selectedUsers]);

    const handleUserToggle = (user) => {
        setSelectedUsers(prev =>
            prev.some(u => u._id === user._id)
                ? prev.filter(u => u._id !== user._id)
                : [...prev, user]
        );
        setSearchQuery("");
    };

    const handleRemoveUser = (userId) => {
        setSelectedUsers(prev => prev.filter(u => u._id !== userId));
    };

	const handleCreateGroup = async () => {
		if (!groupName.trim()) {
			toast.error("Enter a group name");
			return;
		}
		if (selectedUsers.length < 2) {
			toast.error("Select at least 2 members");
			return;
		}

		setLoading(true);
		try {
			await axios.post(
				`http://localhost:8000/api/v1/conversations/group`,
				{
					groupName: groupName.trim(),
					participantIds: selectedUsers.map(u => u._id)
				},
				{ withCredentials: true }
			);
			toast.success("Group created!");
			setGroupName("");
			setSearchQuery("");
			setSelectedUsers([]);
			onGroupCreated?.();
			onClose();
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to create group");
		} finally {
			setLoading(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-md mx-4">
				{/* Header */}
				<div className="flex items-center justify-between border-b border-slate-700 p-4">
					<h2 className="text-xl font-semibold text-white">Create Group</h2>
					<button
						onClick={onClose}
						className="text-slate-400 hover:text-white transition"
					>
						<IoClose className="w-6 h-6" />
					</button>
				</div>

				{/* Body */}
				<div className="p-4 space-y-4 max-h-96 overflow-y-auto">
					{/* Group Name Input */}
					<div>
						<label className="block text-sm font-medium text-slate-300 mb-2">
							Group Name
						</label>
						<input
							type="text"
							placeholder="Enter group name"
							value={groupName}
							onChange={(e) => setGroupName(e.target.value)}
							className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
						/>
					</div>

					{/* Search Users */}
					<div>
						<label className="block text-sm font-medium text-slate-300 mb-2">
							Add Members
						</label>
						<div className="flex items-center gap-2">
							<input
								type="text"
								placeholder="Search users..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="flex-1 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
							/>
							<IoSearchSharp className="w-5 h-5 text-slate-400" />
						</div>
					</div>

					{/* Search Results */}
					{searchQuery.trim() && (
						<div className="border border-slate-700 rounded-lg max-h-32 overflow-y-auto">
							{searchUsers.length > 0 ? (
								searchUsers.map((u) => (
									<div
										key={u._id}
										onClick={() => handleUserToggle(u)}
										className="flex items-center gap-3 p-3 hover:bg-slate-700 cursor-pointer border-b border-slate-700 last:border-b-0 transition"
									>
										<div className="flex-1 min-w-0">
											<p className="font-semibold text-slate-100 truncate">{u.name}</p>
											<p className="text-xs text-slate-400 truncate">{u.email}</p>
										</div>
										<div className="w-5 h-5 rounded border border-slate-500 flex items-center justify-center bg-sky-500">
											<IoSearchSharp className="w-3 h-3 text-white" />
										</div>
									</div>
								))
							) : (
								<div className="p-3 text-center text-sm text-slate-400">No users found</div>
							)}
						</div>
					)}

					{/* Selected Members */}
					{selectedUsers.length > 0 && (
						<div>
							<p className="text-sm font-medium text-slate-300 mb-2">
								Selected Members ({selectedUsers.length})
							</p>
							<div className="space-y-2">
                                {selectedUsers.map((u) => (
                                    <div
                                        key={u._id}
                                        className="flex items-center justify-between bg-slate-700 rounded-lg px-3 py-2"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-slate-100 truncate">
                                                {u.name}
                                            </p>
                                            <p className="text-xs text-slate-400 truncate">
                                                {u.email}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveUser(u._id)}
                                            className="text-slate-400 hover:text-red-400 transition"
                                        >
                                            <IoClose className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
							</div>
						</div>
					)}
				</div>

				{/* Footer */}
				<div className="border-t border-slate-700 p-4 flex gap-2">
					<button
						onClick={onClose}
						className="flex-1 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition"
					>
						Cancel
					</button>
					<button
						onClick={handleCreateGroup}
						disabled={loading || !groupName.trim() || selectedUsers.length < 2}
						className="flex-1 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{loading ? "Creating..." : "Create Group"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default GroupModal;
