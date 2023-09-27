import Message from "../../models/messagesModel.js";

class MessageMongo {
    constructor(io){
        this.io = io;
        this.model = Message;
    }

    async getAllMessagesChat () {
        try{
        const messages = await this.model.find();
        return messages
        } catch (error) {
            console.error(`Error al obtener todos los mensajes ${error}`)   
            throw error
        }

    }

    async addNewMessage (user, message) {
        try {
            const newMessage = new this.model({user, message})
            const saveMessage = await newMessage.save();
            return saveMessage;
        } catch(error){
            console.error(`Error al guardar el mensaje ${error}`)
            throw error;
        }

    }

}


export {MessageMongo as MessageMongo};