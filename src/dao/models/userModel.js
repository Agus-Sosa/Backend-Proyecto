import mongoose from "mongoose";
import { userCollection, cartCollection } from "../managers/mongo/constants/constants.js";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
    },

    last_name: {
        type: String
    },


    fullName: {
        type: String,
        
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    age: {
        type: String,
    },

    
    password: {
        type: String,
        required: true
    },

    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: cartCollection,
    },

    role: {
        type: String,
        enum: ['admin', 'user', 'premium'],
        default: 'user'
    },


    
    
},   
    {
    versionKey: false
    });

const Users = mongoose.model(userCollection, userSchema);

export default Users;