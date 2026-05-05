import { getReceiverSocketId, io } from "../../socket/socket.js";
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

        const receiverId = conversation.participants.find(p => p.toString() !== senderId.toString());

        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            conversationId: conversation._id,
            message: message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
            conversation.lastMessage = newMessage._id;
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", { ...newMessage.toObject(), conversationId: conversation._id });
        }

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

        const conversation = await GroupChat.findOne({
            _id: conversationId,
            participants: userId,
        }).populate({
            path: "messages",
            options: { sort: { createdAt: 1 } },
        });

        if(!conversation){
            return res.status(200).json([]);
        }

        // Mark messages from others as read
        const otherParticipants = conversation.participants.filter(p => p.toString() !== userId.toString());
        await Message.updateMany(
            {
                conversationId: conversation._id,
                senderId: { $in: otherParticipants },
                isRead: false,
            },
            { isRead: true }
        );

        // Emit messageRead to other participants
        otherParticipants.forEach(async (participantId) => {
            const receiverSocketId = getReceiverSocketId(participantId);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("messageRead", {
                    readerId: userId,
                    conversationId: conversation._id,
                });
            }
        });

        res.status(200).json(conversation.messages);

    } catch (error) {
        
        console.log("Error in getMessages", error.message);
        res.status(500).json({ message: "Error getting messages", error: error.message });
  
    }
}