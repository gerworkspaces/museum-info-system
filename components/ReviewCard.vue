<template>
  <section class="bg-[#EFEDE0] py-8 px-8 flex flex-col">
    <div class="container mx-auto px-48">
      <div class="text-yellow-500 flex space-x-1 text-3xl">
        <!-- Hiển thị 5 ngôi sao -->
        <span v-for="i in 5" :key="i">★</span>
      </div>
      <h2 class="text-black text-xl font-semibold mt-4">
        "Multi Coloured Art Theme"
      </h2>
      <p class="text-gray-500 mt-2">Wood and glass finishes</p>

      <div class="flex items-center mt-6 space-x-4">
        <img
          :src="avtImg"
          alt="Reviewer avatar"
          class="w-12 h-12 rounded-full object-cover"
        />
        <div class="text-left">
          <p class="text-gray-800 font-medium">Quang Vo - Developer</p>
          <p class="text-gray-500 text-sm">20-11-2024</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import avtImg from "~/assets/images/my-avt.png";
</script>

<style scoped>
/* Tùy chỉnh thêm CSS nếu cần */
</style>
