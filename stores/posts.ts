import { defineStore } from "pinia";
import { PostTypeService } from "~/service/post-type";
import { PostsService } from "~/service/posts";
import type { PostTypesRequest } from "~/types/post-type";
import type { PostsRequest, PostsState } from "~/types/posts";

const postService = new PostsService();
const postTypeService = new PostTypeService();

export const usePostsStore = defineStore("posts", {
  state: (): PostsState => ({
    posts: [],
    post_types: [],
  }),
  actions: {
    async fetchAllPosts() {
      this.posts = await postService.getPosts();
    },
    async fetchAllPostTypes() {
      this.post_types = await postTypeService.getPostType();
    },
    async addPost(data: PostsRequest) {
      const res = await postService.addPost(data);
      return res.message;
    },
    async addPostType(data: PostTypesRequest) {
      const res = await postTypeService.addPostType(data);
      return res.message;
    },
    async updatePost(data: PostsRequest, id: number) {
      const res = await postService.updatePost(data, id);
      return res.message;
    },
    async updatePostType(data: PostTypesRequest, id: string) {
      const res = await postTypeService.updatePostType(data, id);
      return res.message;
    },
    async deletePost(id: number) {
      const res = await postService.deletePost(id);
      return res.message;
    },
    async deletePostType(id: string) {
      const res = await postTypeService.deletePostType(id);
      return res.message;
    },
    async searchPosts(searchTerm: string) {
      this.posts = await postService.searchPosts(searchTerm);
      console.log("Posts: ", this.posts);
    },
  },
});
