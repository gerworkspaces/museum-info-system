import {
  addPostType,
  updatePostType,
  deletePostType,
  getAllPostTypes,
  getPostTypeById,
} from "./post-type";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === "POST") {
    return addPostType(event);
  } else if (method === "PUT") {
    return updatePostType(event);
  } else if (method === "DELETE") {
    return deletePostType(event);
  } else if (method === "GET") {
    const { id } = getQuery(event);
    return id ? getPostTypeById(event) : getAllPostTypes(event);
  } else {
    throw createError({ statusCode: 405, statusMessage: "Method not allowed" });
  }
});
