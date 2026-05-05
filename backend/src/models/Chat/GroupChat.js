import mongoose from 'mongoose';

const GroupChatSchema = new mongoose.Schema({
    participants: [
        {
            
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        ],
    
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Message',
                default:[],
            },
        ],
        isGroup: {
            type: Boolean,
            default: false,
        },
        groupName: {
            type: String,
            required: false,
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false,
        },
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
        },
    },
    { timestamps: true}
);

const GroupChat = mongoose.model('GroupChat', GroupChatSchema);

export default GroupChat;