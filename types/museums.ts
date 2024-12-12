export interface GalleryItem {
  content?: string;
  name?: string;
  title?: string;
  post_image?: string;
  museum_image?: string;
  author?: string;
}

export interface MuseumsState {
  museums: MuseumsResponse[];
}

export interface MuseumsResponse {
  museum_id: number;
  name: string;
  location: string;
  description: string;
  category_id: string;
  museum_image: string;
  open_time: string;
  close_time: string;
}

export interface MuseumsRequest {
  name: string;
  location: string;
  description: string;
  category_id: string;
  museum_image: string;
  open_time: string;
  close_time: string;
}
