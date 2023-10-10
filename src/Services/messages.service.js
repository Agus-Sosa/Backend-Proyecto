import { messageDao } from "../dao/factory.js"
export class MessageService {

    static getAllMessagesChat (){
        return messageDao.getAllMessagesChat()
    }
    static addNewMessage(user, message){
        return messageDao.addNewMessage(user, message);
    }



}