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

// Compound index: helps MongoDB quickly find messages for one conversation
// and return them in newest-first order.
messageSchema.index({ conversationId: 1, createdAt: -1 });

// Tie-breaker index: used when multiple messages have very close timestamps.
messageSchema.index({ conversationId: 1, _id: -1 });

const Message = mongoose.model("Message", messageSchema);

export default Message;