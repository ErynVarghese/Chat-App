import { getReceiverSocketId } from "../../socket/socket.js";
import GroupChat from "../models/Chat/GroupChat.js";
import Message from "../models/Chat/MessageModel.js";
import asyncHandler from "express-async-handler"; 


export const sendMessage = asyncHandler(async (req, res) => {
    
    
  try {
          
        console.log("user prob", req.user);
        
        const { message } = req.body;
        const { id: receiverId } = req.params;

        console.log(req.user);

        const senderId = req.user._id;

        console.log("Sender ID:", senderId);
        console.log("Receiver ID:", receiverId);

        if (!senderId || !receiverId) {
            return res.status(400).json({ message: "Sender ID or Receiver ID is missing." });
        }

        let conversation = await GroupChat.findOne({
            participants: {
                $all: [senderId, receiverId],
            },
        });

        if (!conversation) {
            conversation = await GroupChat.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage); 


    } catch (error) {

        console.log("Error in sendMessage", error.message);
        res.status(500).json({ message: "Error sending message", error: error.message });
    } 

 
});


export const getMessages = async (req, res) => {

    try {
        
        const { id:userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await GroupChat.findOne({
            participants: {
                $all: [senderId, userToChatId]
            },
        }).populate("messages");

        if(!conversation){
            return res.status(200).json([]); 
        } 

        const messages = conversation.messages;

        res.status(200).json(messages);

    } catch (error) {
        
        console.log("Error in getMessages", error.message);
        res.status(500).json({ message: "Error getting messages", error: error.message });
  
    }
}