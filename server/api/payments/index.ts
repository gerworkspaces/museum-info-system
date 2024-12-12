import { getAllPayments, deletePayment } from "./payments";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === "DELETE") {
    return deletePayment(event);
  } else if (method === "GET") {
    return getAllPayments(event);
  } else {
    throw createError({ statusCode: 405, statusMessage: "Method not allowed" });
  }
});
