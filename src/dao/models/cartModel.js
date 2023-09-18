import mongoose from "mongoose";
import { cartCollection, productCollection } from "../managers/mongo/constants/constants.js";
const cartSchema = new mongoose.Schema({
    
    products:[
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: productCollection,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
        }
    ],
},
    {
        versionKey: false
    }
    )

cartSchema.pre(['find','findOne'], function(){
    this.populate(`${productCollection}.product`)
})


const Cart = mongoose.model(cartCollection, cartSchema);

export default Cart;