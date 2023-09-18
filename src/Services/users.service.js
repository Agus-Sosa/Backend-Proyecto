import { userDao } from "../dao/index.js";

export class UserService {
    static async saveUser(user){
        return await userDao.saveUsers(user)
    }

    static async getUserById (userId) {
        return await userDao.getUserById(userId)
    }

    static async getByEmail(userEmail){
        return await userDao.getByEmail(userEmail)
    }
}