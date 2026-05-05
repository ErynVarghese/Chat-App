import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GroupChat',
        required: true,
    },

    message: {
        type: String,
        required: true,
        maxLength: 500,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
} , {timestamps: true});

const Message = mongoose.model("Message", messageSchema);

export default Message;