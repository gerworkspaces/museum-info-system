import type { PostTypesResponse } from "./post-type";

export interface PostsState {
  posts: PostsResponse[];
  post_types: PostTypesResponse[];
}

export interface PostsResponse {
  post_id: number;
  user_id: number;
  title?: string;
  content: string;
  post_date: string;
  post_type_id: string;
  post_image: string;
}

export interface PostsRequest {
  user_id: number;
  title?: string;
  content: string;
  post_date: string;
  post_type_id: string;
  post_image: string;
}
