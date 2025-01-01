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
    },
    { timestamps: true}
);

const GroupChat = mongoose.model('GroupChat', GroupChatSchema);

export default GroupChat;