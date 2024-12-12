import {
  addPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostById,
  searchPosts,
} from "./posts";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === "POST") {
    return addPost(event);
  } else if (method === "PUT") {
    return updatePost(event);
  } else if (method === "DELETE") {
    return deletePost(event);
  } else if (method === "GET") {
    const { id, search } = getQuery(event);
    return search
      ? searchPosts(event)
      : id
      ? getPostById(event)
      : getAllPosts(event);
  } else {
    throw createError({ statusCode: 405, statusMessage: "Method not allowed" });
  }
});
