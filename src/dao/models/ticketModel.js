import mongoose from "mongoose";
import { tickeCollection } from "../managers/mongo/constants/constants.js";
import { v4 as uuidv4 } from "uuid";


const ticketSchema = new mongoose.Schema({
    code:{
        type:String,
        default: uuidv4,
        required:true
    },
    purchase_datetime:{
        type: Date,
        default: Date.now
    },
    amount:{
        type:Number,
        default:10,
        required:true
    },
    purchaser:String,
});

const Ticket = mongoose.model(tickeCollection, ticketSchema);

export default Ticket;