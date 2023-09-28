import Cart from "../../models/cartModel.js";
import Users from "../../models/userModel.js";

class UsersMongo {
    
    constructor(){
        this.modelUser = Users;
        this.modelCart = Cart
    }

        async saveUsers (user) {
            try {
                
                const usersCreated = await this.modelUser.create(user)
                const newCart = await this.modelCart.create({products: []})

                usersCreated.cart = newCart._id;
                await usersCreated.save();
                return usersCreated;

            } catch (error) {
                throw error
            }
        }


    async getUserById (userId){
        try {
            const user = await this.modelUser.findById(userId).lean();
            return user;
        } catch (error) {
            throw error
        }
    }


    async getByEmail (userEmail) {
        try {
            const user = await this.modelUser.findOne({email:userEmail}).lean();
            if(user){
                return user;
            } else {
                return null
            }
        } catch (error) {
            throw error
        }
    }
}


export {UsersMongo as UsersMongo};