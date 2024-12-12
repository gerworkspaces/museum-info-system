import {
  addBooking,
  updateBooking,
  deleteBooking,
  getAllBookings,
  searchBookings,
} from "./book-tickets";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === "POST") {
    return addBooking(event);
  } else if (method === "PUT") {
    return updateBooking(event);
  } else if (method === "DELETE") {
    return deleteBooking(event);
  } else if (method === "GET") {
    const { search } = getQuery(event);
    return search ? searchBookings(event) : getAllBookings(event);
  } else {
    throw createError({ statusCode: 405, statusMessage: "Method not allowed" });
  }
});
