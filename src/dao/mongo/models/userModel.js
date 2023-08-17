import mongoose from "mongoose";
import { userCollection } from "../constants/constants.js";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },


    email: {
        type: String,
        required: true,
        unique: true,
    },

    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    
    password: {
        type: String,
        required: true
    }
});

const Users = mongoose.model(userCollection, userSchema);

export default Users;