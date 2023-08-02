import mongoose from "mongoose";



const messageCollection = 'messages'

const messageSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model(messageCollection, messageSchema);

export default Message;
