import Ticket from "../../models/ticketModel.js"

export class TicketsMongo {
    constructor(){
        this.model = Ticket;
    }


    async createTicket (ticketInfo) {
        try {
            const result = await this.model.create(ticketInfo)
            return result
        } catch (error) {
            throw new Error(`Error al crear el ticket ${error.message}`)
        }
    }
}