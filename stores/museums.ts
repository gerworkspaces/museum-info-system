import { defineStore } from "pinia";
import { MuseumsService } from "~/service/museums";
import type { MuseumsRequest, MuseumsState } from "~/types/museums";

const museumsService = new MuseumsService();

export const useMuseumsStore = defineStore("museums", {
  state: (): MuseumsState => ({
    museums: [],
  }),
  actions: {
    async fetchAllMuseums() {
      this.museums = await museumsService.getAllMuseums();
    },
    async addMuseum(data: MuseumsRequest) {
      const res = await museumsService.addMuseum(data);
      return res.message;
    },
    async updateMuseum(data: MuseumsRequest, id: number) {
      const res = await museumsService.updateMuseum(data, id);
      return res.message;
    },
    async deleteMuseum(id: number) {
      const res = await museumsService.deleteMuseum(id);
      return res.message;
    },
    async searchMuseums(query: string, category_id?: string) {
      const results = await museumsService.searchMuseums(query, category_id);
      this.museums = results;
    },
  },
});
