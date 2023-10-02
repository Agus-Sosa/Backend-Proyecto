import { ticketDao } from "../dao/index.js"

export class TicketsService {
    static async createTicket (){
        return await ticketDao.createTicket()
    }
}