import {
  addRole,
  updateRole,
  deleteRole,
  searchRoleByName,
  getAllRoles,
} from "./roles";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === "POST") {
    return addRole(event);
  } else if (method === "PUT") {
    return updateRole(event);
  } else if (method === "DELETE") {
    return deleteRole(event);
  } else if (method === "GET") {
    const { name } = getQuery(event);
    if (name) {
      return searchRoleByName(event);
    } else {
      return getAllRoles(event);
    }
  } else {
    throw createError({ statusCode: 405, statusMessage: "Method not allowed" });
  }
});
