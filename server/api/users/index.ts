import { addUser, updateUser, deleteUser, searchUserByName, getUsers } from "./users";
import { defineEventHandler, getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === "POST") {
    return addUser(event);
  } else if (method === "PUT") {
    return updateUser(event);
  } else if (method === "DELETE") {
    return deleteUser(event);
  } else if (method === "GET") {
    const { name } = getQuery(event);
    if (name) {
      return searchUserByName(event);
    } else {
      return getUsers(event);
    }
  } else {
    throw createError({ statusCode: 405, statusMessage: "Method not allowed" });
  }
});
