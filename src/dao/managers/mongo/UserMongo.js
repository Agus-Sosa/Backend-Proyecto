import Users from "../../models/userModel.js";

class UsersMongo {

    constructor(){
        this.model = Users;
    }

    async saveUsers (user) {
        try {
            const usersCreated = await this.model.create(user)
            return usersCreated;

        } catch (error) {
            throw error
        }
    }


    async getUserById (userId){
        try {
            const user = await this.model.findById(userId).lean();
            return user;
        } catch (error) {
            throw error
        }
    }


    async getByEmail (userEmail) {
        try {
            const user = await this.model.findOne({email:userEmail}).lean();
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