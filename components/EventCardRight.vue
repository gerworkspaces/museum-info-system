<template>
  <section class="text-white p-8 mb-8">
    <div
      class="container mx-auto flex flex-row items-center justify-center px-24"
    >
      <!-- Nội dung văn bản -->
      <div class="w-1/2 order-1 max-w-lg pl-24">
        <div class="flex items-center mb-2">
          <div class="w-14 h-[2px] bg-yellow-400 mr-6"></div>
          <p class="text-yellow-400 uppercase text-sm">{{ dateRange }}</p>
        </div>
        <div class="pl-7">
          <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>
          <p class="text-gray-300 mb-4">{{ description }}</p>
          <button
            class="bg-white text-gray-900 py-2 px-6 rounded-lg font-semibold hover:bg-gray-200"
          >
            View Details
          </button>
        </div>
      </div>

      <!-- Ảnh sự kiện -->
      <div class="w-1/2 order-2 relative image-event">
        <img
          :src="props.image"
          alt="Event img"
          class="min-w-96 h-72 object-cover rounded-lg"
        />
        <img
          :src="plusImg"
          alt="Plus icon"
          class="absolute top-14 right-4 w-32 h-40"
        />
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
