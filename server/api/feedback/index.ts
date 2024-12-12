import {
  addFeedback,
  getAllFeedback,
  getFeedbackById,
  deleteFeedback,
} from "./feedback";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === "POST") {
    return addFeedback(event);
  } else if (method === "GET") {
    const { id } = getQuery(event);
    return id ? getFeedbackById(event) : getAllFeedback(event);
  } else if (method === "DELETE") {
    return deleteFeedback(event);
  } else {
    throw createError({ statusCode: 405, statusMessage: "Method not allowed" });
  }
});
