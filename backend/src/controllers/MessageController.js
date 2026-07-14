import { io } from "../../socket/socket.js";
import GroupChat from "../models/Chat/GroupChat.js";
import Message from "../models/Chat/MessageModel.js";
import asyncHandler from "express-async-handler"; 


export const sendMessage = asyncHandler(async (req, res) => {
    
    
  try {
          
        console.log("user prob", req.user);
        
        const { message } = req.body;
        const { id } = req.params;

        const senderId = req.user._id;

        if (!senderId || !id) {
            return res.status(400).json({ message: "Sender ID or ID is missing." });
        }

        let conversation = await GroupChat.findById(id);

        if (!conversation) {
            // Treat id as receiverId
            const receiverId = id;
            conversation = await GroupChat.findOne({
                participants: { $all: [senderId, receiverId], $size: 2 },
                isGroup: false,
            });

            if (!conversation) {
                conversation = await GroupChat.create({
                    participants: [senderId, receiverId],
                    isGroup: false,
                });
            }
        }

        const recipientIds = conversation.participants.filter(
            (participantId) =>
                participantId.toString() !== senderId.toString()
        );

        const newMessage = new Message({
            senderId: senderId,
            receiverId: conversation.isGroup ? null : recipientIds[0],
            conversationId: conversation._id,
            message: message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
            conversation.lastMessage = newMessage._id;
        }

        await Promise.all([conversation.save(), newMessage.save()]);
        recipientIds.forEach((recipientId) => {
            io.to(recipientId.toString()).emit("newMessage", {
                ...newMessage.toObject(),
                conversationId: conversation._id,
            });
        });

        res.status(201).json({ ...newMessage.toObject(), conversationId: conversation._id }); 


    } catch (error) {

        console.log("Error in sendMessage", error.message);
        res.status(500).json({ message: "Error sending message", error: error.message });
    } 

 
});


export const getMessages = async (req, res) => {

    try {
        
        const { id: conversationId } = req.params;
        const userId = req.user._id;

        // Page size: default 20, max 50 so one request cannot load too much data.
        const limit = Math.min(Number(req.query.limit) || 20, 50);

        // Cursor pagination: "before" means load messages older than this timestamp.
        const before = req.query.before;

        // Authorization check: make sure the user belongs to this conversation.
        const conversation = await GroupChat.findOne({
        _id: conversationId,
        participants: userId,
        });

        if (!conversation) {
        return res.status(200).json({
            messages: [],
            hasMore: false,
            nextCursor: null,
        });
        }

        // Indexed query: uses conversationId + createdAt index.
        const query = {
        conversationId: conversation._id,
        };

        // Range query for cursor pagination.
        if (before) {
        query.createdAt = { $lt: new Date(before) };
        }

        // Fetch newest first. limit + 1 lets us know if another page exists.
        const messages = await Message.find(query)
        .sort({ createdAt: -1 })
        .limit(limit + 1)
        .populate("senderId", "name email photo");

        // Pagination metadata.
        const hasMore = messages.length > limit;

        // Only return requested page size.
        const paginatedMessages = messages.slice(0, limit);

        // UI wants oldest → newest, so reverse after fetching newest-first.
        const orderedMessages = paginatedMessages.reverse();

        // Next cursor = oldest message in this batch.
        const nextCursor =
        hasMore && orderedMessages.length > 0
            ? orderedMessages[0].createdAt
            : null;

        // Mark messages from others as read.
        const otherParticipants = conversation.participants.filter(
        (p) => p.toString() !== userId.toString()
        );

        await Message.updateMany(
        {
            conversationId: conversation._id,
            senderId: { $in: otherParticipants },
            isRead: false,
        },
        { isRead: true }
        );

        otherParticipants.forEach((participantId) => {
            io.to(participantId.toString()).emit("messageRead", {
                readerId: userId,
                conversationId: conversation._id,
            });
        });

        // Paginated API response.
        res.status(200).json({
        messages: orderedMessages,
        hasMore,
        nextCursor,
        });
    } catch (error) {
        console.log("Error in getMessages", error.message);
        res.status(500).json({
        message: "Error getting messages",
        error: error.message,
        });
    }
};

export const markConversationAsRead = async (req, res) => {
  try {
    const { id: conversationId } = req.params;
    const userId = req.user._id;

    const conversation = await GroupChat.findOne({
      _id: conversationId,
      participants: userId,
    });

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found",
      });
    }

    const otherParticipants = conversation.participants.filter(
      (participantId) =>
        participantId.toString() !== userId.toString()
    );

    await Message.updateMany(
      {
        conversationId: conversation._id,
        senderId: { $in: otherParticipants },
        isRead: false,
      },
      {
        isRead: true,
      }
    );

    otherParticipants.forEach((participantId) => {
      io.to(participantId.toString()).emit("messageRead", {
        readerId: userId,
        conversationId: conversation._id,
      });
    });

    return res.status(200).json({
      message: "Messages marked as read",
    });
  } catch (error) {
    console.log("Error marking messages as read", error.message);

    return res.status(500).json({
      message: "Error marking messages as read",
      error: error.message,
    });
  }
};