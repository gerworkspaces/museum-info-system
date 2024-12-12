<template>
  <section class="bg-[#C7C7C7] py-10 px-5 md:px-10 lg:px-20 container mx-auto">
    <div class="text-black">
      <h3 class="text-yellow-500 text-2xl font-semibold">OUR PORTFOLIO'S</h3>
      <div class="flex justify-between items-center mt-6">
        <h2 class="text-5xl font-bold mt-1">Explore Our Collection</h2>
        <p class="text-black mt-4 max-w-lg text-justify">
          Here we startup the museum system to manage information. Keep them always private & In a museum, events must be managed with users participating in the event.
          -------------------------------------------------------------
          C2SE.03 - Danang Museum Information System
          ------------------------------
        </p>
      </div>
    </div>

    <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="(item, index) in visibleItems"
        :key="index"
        class="bg-gray-200"
      >
        <img
          :src="item.post_image"
          :alt="item.title"
          class="w-full h-80 object-cover"
        />
        <div class="p-4">
          <h2 class="font-semibold text-lg text-gray-900">
            {{ item.title }}
          </h2>
          <h3 class="font-medium text-base text-gray-700">
            {{ item.content }}
          </h3>
          <p class="text-sm text-gray-400">By {{ item.author }}</p>
        </div>
      </div>
    </div>

    <div class="text-center mt-8">
      <button
        v-if="displayCount < props.galleryItems.length"
        @click="showMoreItems"
        class="px-6 py-2 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all"
      >
        VIEW MORE
      </button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import type { GalleryItem } from "~/types/museums";

const props = defineProps<{
  galleryItems: GalleryItem[];
}>();

const displayCount = ref(6);

const showMoreItems = () => {
  displayCount.value += 6;
};

const visibleItems = computed(() => {
  return props.galleryItems.slice(0, displayCount.value);
});
</script>

<style scoped></style>
