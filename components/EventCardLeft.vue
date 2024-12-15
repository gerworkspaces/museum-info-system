<template>
  <section class="text-white p-8 mb-8">
    <div
      class="container mx-auto flex flex-row items-center justify-center px-24"
    >
      <!-- Ảnh sự kiện -->
      <!-- //+
       * Renders the image section of the event card.//+
       * //+
       * @component//+
       * @description This component displays the event image along with a decorative plus icon.//+
       *              It's positioned on the left side of the card and takes up half the width.//+
       * //+
       * @prop {string} props.image - The URL of the event image to be displayed.//+
       * //+
       * @example//+
       * <template>//+
       *   <div class="w-1/2 order-1 relative image-event">//+
       *     <img :src="props.image" alt="Event img" class="min-w-96 h-72 object-cover rounded-lg" />//+
       *     <img :src="plusImg" alt="Plus icon" class="absolute top-14 left-4 w-32 h-40 rotate-180" />//+
       *   </div>//+
       * </template>//+
       -->//+
      <div class="w-1/2 order-1 relative image-event">
        <img
          :src="props.image"
          alt="Event img"
          class="min-w-96 h-72 object-cover rounded-lg"
        />
        <img
          :src="plusImg"
          alt="Plus icon"
          class="absolute top-14 left-4 w-32 h-40 rotate-180"
        />
      </div>

      <!-- Nội dung văn bản -->
      <div class="w-1/2 order-2 max-w-lg">
        <div class="flex items-center mb-2">
          <div class="w-14 h-[2px] bg-yellow-400 mr-6"></div>
          <p class="text-yellow-400 uppercase text-sm">{{ dateRange }}</p>
        </div>
        <div class="">
          <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>
          <p class="text-gray-300 mb-4">{{ description }}</p>
          <button
            class="bg-white text-gray-900 py-2 px-6 rounded-lg font-semibold hover:bg-gray-200"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import plusImg from "@/assets/images/plus+.png";

const props = defineProps({
  dateRange: String,
  title: String,
  description: String,
  image: String,
});
</script>

<style scoped>
.image-event {
  text-align: -webkit-center;
}
</style>
