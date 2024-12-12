import type { EventRequest, ReviewEventRequest } from "~/types/event";
import { postData, getData, putData, deleteData } from "./api-service";

export class EventService {
  getAllEvents() {
    return getData("/events");
  }
  addEvent(event: EventRequest) {
    return postData("/events", event);
  }
  getEventById(id: number) {
    return getData(`/events?id=${id}`);
  }
  updateEvent(id: number, event: EventRequest) {
    return putData(`/events?id=${id}`, event);
  }
  deleteEvent(id: number) {
    return deleteData(`/events?id=${id}`);
  }
  getAllReviews() {
    return getData("/events?type=reviews");
  }
  addReviewEvent(review: ReviewEventRequest) {
    return postData("/events", review);
  }
  deleteReviewEvent(id: number) {
    return deleteData(`/events?id=${id}&type=reviews`);
  }
}
