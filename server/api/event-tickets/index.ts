import {
  addEventTicket,
  updateEventTicket,
  deleteEventTicket,
  getAllEventTickets,
  getEventTicketById,
} from "./event-tickets";
import { defineEventHandler, getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === "POST") {
    return addEventTicket(event);
  } else if (method === "PUT") {
    return updateEventTicket(event);
  } else if (method === "DELETE") {
    return deleteEventTicket(event);
  } else if (method === "GET") {
    const { id } = getQuery(event);
    return id ? getEventTicketById(event) : getAllEventTickets(event);
  } else {
    throw createError({ statusCode: 405, statusMessage: "Method not allowed" });
  }
});
