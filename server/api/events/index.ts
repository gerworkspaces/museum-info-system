import {
  addEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  addReviewEvent,
  getAllReviews,
  deleteReviewEvent,
} from "./events";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === "GET") {
    const { id, type } = getQuery(event);
    if (type === "reviews") {
      return getAllReviews(event);
    }
    return id ? getEventById(event) : getAllEvents(event);
  } else if (method === "POST") {
    const { type } = await readBody(event);
    if (type === "review") {
      return addReviewEvent(event);
    }
    return addEvent(event);
  } else if (method === "PUT") {
    return updateEvent(event);
  } else if (method === "DELETE") {
    const { id, type } = getQuery(event);

    if (id && type === "reviews") {
      return deleteReviewEvent(event);
    }
    if (id && !type) {
      return deleteEvent(event);
    }
  } else {
    throw createError({ statusCode: 405, statusMessage: "Method not allowed" });
  }
});
