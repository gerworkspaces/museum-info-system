import {
  addMuseum,
  updateMuseum,
  deleteMuseum,
  getAllMuseums,
  getMuseumById,
  searchMuseums,
} from "./museums";
import { defineEventHandler, getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === "POST") {
    return addMuseum(event);
  } else if (method === "PUT") {
    return updateMuseum(event);
  } else if (method === "DELETE") {
    return deleteMuseum(event);
  } else if (method === "GET") {
    const { id, query, category_id } = getQuery(event);
    if (query || category_id) {
      return searchMuseums(event);
    }
    return id ? getMuseumById(event) : getAllMuseums(event);
  } else {
    throw createError({ statusCode: 405, statusMessage: "Method not allowed" });
  }
});
