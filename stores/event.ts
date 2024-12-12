import { defineStore } from "pinia";
import { EventService } from "~/service/event";
import type {
  EventRequest,
  EventState,
  ReviewEventRequest,
} from "~/types/event";

const eventService = new EventService();

export const useEventStore = defineStore("events", {
  state: (): EventState => ({
    events: [],
    reviews: [],
  }),
  actions: {
    async fetchEvents() {
      this.events = await eventService.getAllEvents();
    },
    async addEvent(event: EventRequest) {
      return await eventService.addEvent(event);
    },
    async getEventById(id: number) {
      return await eventService.getEventById(id);
    },
    async updateEvent(id: number, event: EventRequest) {
      return await eventService.updateEvent(id, event);
    },
    async deleteEvent(id: number) {
      return await eventService.deleteEvent(id);
    },
    async getAllReviews() {
      this.reviews = await eventService.getAllReviews();
    },
    async addReviewEvent(review: ReviewEventRequest) {
      return await eventService.addReviewEvent(review);
    },
    async deleteReviewEvent(id: number) {
      return await eventService.deleteReviewEvent(id);
    },
  },
});
