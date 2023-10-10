import { ticketDao } from "../dao/factory.js"

export class TicketsService {
    static async createTicket (){
        return await ticketDao.createTicket()
    }
}