export interface EventState {
  events: EventResponse[];
  reviews: ReviewEventResponse[];
}

export interface EventResponse {
  event_id: number;
  event_name: string;
  event_date: string;
  event_image: string;
  description: string;
  museum_id: number;
}

export interface EventRequest {
  event_id: number;
  event_name: string;
  event_date: string;
  event_image: string;
  description: string;
  museum_id: number;
}

export interface ReviewEventResponse {
  review_id: number;
  event_id: number;
  user_id: number;
  subject: string;
  email: string;
  full_name: string;
  content: string;
  rating: number;
}

export interface ReviewEventRequest {
  type: string;
  event_id: number;
  user_id: number;
  subject: string;
  email: string;
  full_name: string;
  content: string;
  rating: number;
}
