import type { PostTypesRequest } from "~/types/post-type";
import { deleteData, getData, postData, putData } from "./api-service";

export class PostTypeService {
  getPostType() {
    return getData("/post-type");
  }
  addPostType(data: PostTypesRequest) {
    return postData("/post-type", data);
  }
  updatePostType(data: PostTypesRequest, id: string) {
    return putData(`/post-type?id=${id}`, data);
  }
  deletePostType(id: string) {
    return deleteData(`/post-type?id=${id}`);
  }
}
