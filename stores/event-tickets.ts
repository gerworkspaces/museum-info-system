import { defineStore } from "pinia";
import { EventTicketService } from "~/service/event-tickets";
import { PaymentsService } from "~/service/payments";
import type {
  EventTicketsState,
  TicketRequest,
  TicketsResponse,
} from "~/types/event-tickets";

const eventTicketService = new EventTicketService();
const paymentService = new PaymentsService();

export const useEventTicketsStore = defineStore("eventTickets", {
  state: (): EventTicketsState => ({
    tickets: [],
    ticket: {} as TicketsResponse,
    payments: [],
  }),
  actions: {
    async getAllTickets() {
      this.tickets = await eventTicketService.getAllTickets();
    },
    async getAllTicketsByFilters(filters: {
      category_id?: string;
      min_price?: number;
      max_price?: number;
      start_date?: string;
      end_date?: string;
    }) {
      this.tickets = await eventTicketService.getAllTicketsByFilters(filters);
    },
    async fetchTicketById(id: number) {
      this.ticket = await eventTicketService.getTicketById(id);
    },
    async addTicket(ticketData: any) {
      return await eventTicketService.addTicket(ticketData);
    },
    async updateTicket(ticket: TicketRequest) {
      return await eventTicketService.updateTicket(ticket);
    },
    async deleteTicket(id: number) {
      return await eventTicketService.deleteTicket(id);
    },
    async getAllPayments() {
      this.payments = await paymentService.getAllPayments();
    },
    async deletePayment(id: number) {
      return await paymentService.deletePayment(id);
    },
  },
});
