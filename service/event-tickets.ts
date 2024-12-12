import type { TicketRequest } from "~/types/event-tickets";
import { postData, getData, putData, deleteData } from "./api-service";

export class EventTicketService {
  getAllTickets() {
    return getData("/event-tickets");
  }

  getAllTicketsByFilters(
    filters: {
      category_id?: string;
      min_price?: number;
      max_price?: number;
      start_date?: string;
      end_date?: string;
    } = {}
  ) {
    const stringifiedFilters = {
      ...filters,
      min_price: filters.min_price?.toString() || "",
      max_price: filters.max_price?.toString() || "",
    };
    const queryParams = new URLSearchParams(stringifiedFilters).toString();
    return getData(`/event-tickets?${queryParams}`);
  }

  getTicketById(id: number) {
    return getData(`/event-tickets?id=${id}`);
  }

  addTicket(ticket: TicketRequest) {
    return postData("/event-tickets", ticket);
  }

  updateTicket(ticket: TicketRequest) {
    return putData(`/event-tickets/${ticket.event_id}`, ticket);
  }

  deleteTicket(id: number) {
    return deleteData(`/event-tickets/${id}`);
  }
}
