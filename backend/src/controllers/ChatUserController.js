import User from "../models/auth/UserModel.js";
import GroupChat from "../models/Chat/GroupChat.js";

export const createDirectConversation = async (req, res) => {
    try {
        const { receiverId } = req.body;
        const senderId = req.user._id;

        if (!receiverId) {
            return res.status(400).json({ message: "Receiver ID is required" });
        }

        let conversation = await GroupChat.findOne({
            participants: { $all: [senderId, receiverId], $size: 2 },
            isGroup: false,
        });

        if (!conversation) {
            conversation = await GroupChat.create({
                participants: [senderId, receiverId],
                isGroup: false,
            });
        }

        res.status(201).json({
            conversationId: conversation._id,
            isGroup: conversation.isGroup,
            participants: conversation.participants,
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating direct conversation", error: error.message });
    }
};

export const createGroupConversation = async (req, res) => {
    try {
        const { groupName, participantIds } = req.body;
        const adminId = req.user._id;

        if (!participantIds || participantIds.length < 2) {
            return res.status(400).json({ message: "At least 2 participants required for group" });
        }

        const participants = [adminId, ...participantIds];

        const conversation = await GroupChat.create({
            participants,
            isGroup: true,
            groupName,
            groupAdmin: adminId,
        });

        res.status(201).json({
            conversationId: conversation._id,
            isGroup: conversation.isGroup,
            groupName: conversation.groupName,
            participants: conversation.participants,
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating group conversation", error: error.message });
    }
};

export const searchUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const query = req.query.query || "";

    const users = await User.find({
      _id: { $ne: loggedInUser },
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    }).select("name email photo");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Error searching users",
      error: error.message,
    });
  }
};

export const getConversations = async(req,res) => {

    try {

        const loggedInUser = req.user._id;

        const conversations = await GroupChat.find({ participants: loggedInUser })
            .populate({
                path: "participants",
                select: "name email",
            })
            .populate("lastMessage")
            .sort({ updatedAt: -1 });

        const formattedConversations = conversations.map((chat) => {
            const otherParticipants = chat.participants.filter(p => p._id.toString() !== loggedInUser.toString());
            return {
                conversationId: chat._id,
                isGroup: chat.isGroup,
                groupName: chat.groupName,
                otherParticipant: chat.isGroup ? null : otherParticipants[0],
                participants: chat.participants.map(p => ({ _id: p._id, name: p.name, email: p.email })),
                lastMessage: chat.lastMessage,
                updatedAt: chat.updatedAt,
            };
        });

        res.status(200).json(formattedConversations);
    } catch (error) {
        res.status(500).json({ message: "Error getting conversations", error: error.message });
    }
};

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const users = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("name email photo");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Error getting users for sidebar",
      error: error.message,
    });
  }
};