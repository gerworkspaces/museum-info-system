<template>
  <div
    class="relative overflow-hidden w-full h-[500px]"
    @mouseover="pauseAutoSlide"
    @mouseleave="startAutoSlide"
  >
    <div
      v-for="(slide, index) in slides"
      :key="index"
      :class="[
        'absolute inset-0 transition-transform duration-500 ease-in-out transform',
        index === activeSlide
          ? 'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0',
        index === prevSlide ? '-translate-x-full opacity-0' : '',
      ]"
    >
      <img
        :src="slide.image"
        alt="Museum Slide"
        class="w-full h-full object-cover opacity-80"
      />
      <div
        class="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center p-4 text-white"
      >
        <h2 class="text-3xl font-semibold mb-4">{{ slide.title }}</h2>
        <p class="text-base mb-4">{{ slide.description }}</p>
        <button
          @click="bookTickets"
          class="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded shadow-lg"
        >
          Buy Tickets
        </button>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <button
      @click="prevSlideHandler"
      class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl font-bold bg-black bg-opacity-50 p-2 rounded-full"
    >
      ‹
    </button>
    <button
      @click="nextSlideHandler"
      class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl font-bold bg-black bg-opacity-50 p-2 rounded-full"
    >
      ›
    </button>

    <!-- Dots -->
    <div
      class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
    >
      <span
        v-for="(slide, index) in slides"
        :key="index"
        @click="setSlide(index)"
        :class="[
          'w-3 h-3 rounded-full',
          activeSlide === index ? 'bg-white' : 'bg-gray-500',
        ]"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

import imgSlideOne from "@/assets/images/img_slide_1.png";
import imgSlideTwo from "@/assets/images/img_slide_2.png";
import imgSlideThr from "@/assets/images/img_slide_3.png";

const slides = ref([
  {
    image: imgSlideOne,
    title: "Antiques",
    description:
      "Tiền thời nhà Thanh - Trung Quốc hiệu “Thuận Trị thông bảo”, khai quật tại di chỉ khảo cổ học Vườn đình Khuê Bắc, phường Hòa Hải, quận Ngũ Hành Sơn, thành phố Đà Nẵng, năm 2001, có niên đại thế kỷ XVII.",
  },
  {
    image: imgSlideTwo,
    title: "Flower Vase",
    description:
      "Tiền thời nhà Thanh - Trung Quốc hiệu “Thuận Trị thông bảo”, khai quật tại di chỉ khảo cổ học Vườn đình Khuê Bắc, phường Hòa Hải, quận Ngũ Hành Sơn, thành phố Đà Nẵng, năm 2001, có niên đại thế kỷ XVII.",
  },
  {
    image: imgSlideThr,
    title: "Animal Earings",
    description:
      "Tiền thời nhà Thanh - Trung Quốc hiệu “Thuận Trị thông bảo”, khai quật tại di chỉ khảo cổ học Vườn đình Khuê Bắc, phường Hòa Hải, quận Ngũ Hành Sơn, thành phố Đà Nẵng, năm 2001, có niên đại thế kỷ XVII.",
  },
  // Add more slides here
]);

const activeSlide = ref(0);
const prevSlide = ref(0);
let intervalId: NodeJS.Timeout;

function startAutoSlide() {
  intervalId = setInterval(nextSlideHandler, 3000); // Slide every 0.5s
}

function pauseAutoSlide() {
  clearInterval(intervalId);
}

function nextSlideHandler() {
  prevSlide.value = activeSlide.value;
  activeSlide.value = (activeSlide.value + 1) % slides.value.length;
}

function prevSlideHandler() {
  prevSlide.value = activeSlide.value;
  activeSlide.value =
    (activeSlide.value - 1 + slides.value.length) % slides.value.length;
}

function setSlide(index: number) {
  prevSlide.value = activeSlide.value;
  activeSlide.value = index;
}

function bookTickets() {
  // Logic to navigate to the booking page or handle booking
}

onMounted(() => {
  startAutoSlide(); // Start the auto-slide when the component mounts
});

onUnmounted(() => {
  clearInterval(intervalId); // Clear the interval when the component is destroyed
});
</script>

<style scoped>
/* Optional: Add custom styling if needed */
</style>
