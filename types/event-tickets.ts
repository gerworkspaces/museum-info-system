import type { PaymentResponse } from "./payments";

export interface EventTicketsState {
  tickets: TicketsResponse[];
  ticket: TicketsResponse;
  payments: PaymentResponse[];
}

export interface TicketsResponse {
  event_id: number;
  total_tickets: number;
  available_tickets: number;
  ticket_price: string;
  ticket_name: string;
  ticket_image: string;
  ticket_description: string;
  category_name?: string;
  event_date?: string;
  event_name?: string;
  event_image?: string;
  reviews?: ReviewEventResponse[];
}

export interface TicketRequest {
  event_id: number;
  total_tickets: number;
  available_tickets: number;
  ticket_price: string;
  ticket_name: string;
  ticket_image: string;
  ticket_description: string;
}

export interface ReviewEventResponse {
  content: string;
  email: string;
  full_name: string;
  rating: number;
  review_id: number;
  subject: string;
}
