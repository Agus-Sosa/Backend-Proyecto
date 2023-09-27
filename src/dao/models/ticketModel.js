import mongoose from "mongoose";
import { tickeCollection } from "../managers/mongo/constants/constants.js";

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        
    },
    purchase_datetime: {
        type:Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required:true
    },
    purchaser: {
        type:String,
        required: true
    },
});

const Ticket = mongoose.model(tickeCollection, ticketSchema);

export default Ticket;