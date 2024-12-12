import type { MuseumsRequest } from "~/types/museums";
import { deleteData, getData, postData, putData } from "./api-service";

export class MuseumsService {
  getAllMuseums() {
    return getData("/museums");
  }
  addMuseum(data: MuseumsRequest) {
    return postData("/museums", data);
  }
  updateMuseum(data: MuseumsRequest, id: number) {
    return putData(`/museums?id=${id}`, data);
  }
  deleteMuseum(id: number) {
    return deleteData(`/museums?id=${id}`);
  }
  searchMuseums(query: string, category_id?: string) {
    const params = new URLSearchParams();
    if (query) {
      params.append("query", query);
    }
    if (category_id) {
      params.append("category_id", category_id);
    }
    return getData(`/museums?${params.toString()}`);
  }
}
