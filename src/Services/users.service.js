import { userDao } from "../dao/factory.js";

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

    static async updateUser(idUser, newData){
        return await userDao.updateUser(idUser, newData)
    }

    static async getUsers(){
        return await userDao.getUsers()
    }

    static async getUsersInactiveSince(date){
        return await userDao.getUsersInactiveSince(date);
    }

    static async deleteUser (userId){
        return await userDao.deleteUser(userId)
    }
}