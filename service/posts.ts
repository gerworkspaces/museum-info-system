import type { PostsRequest } from "~/types/posts";
import { deleteData, getData, postData, putData } from "./api-service";

export class PostsService {
  getPosts() {
    return getData("/posts");
  }
  addPost(data: PostsRequest) {
    return postData("/posts", data);
  }
  updatePost(data: PostsRequest, id: number) {
    return putData(`/posts?id=${id}`, data);
  }
  deletePost(id: number) {
    return deleteData(`/posts?id=${id}`);
  }
  searchPosts(searchTerm: string) {
    return getData(`/posts?search=${encodeURIComponent(searchTerm)}`);
  }
}
