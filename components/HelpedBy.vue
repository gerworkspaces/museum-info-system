<template>
  <div class="container mx-auto">
    <section class="text-white py-8 relative">
      <h2 class="text-2xl font-bold mt-8 absolute top-4 left-64">Helped by</h2>
      <div class="flex justify-center space-x-4 px-4 mt-16">
        <img
          v-for="logo in logos"
          :key="logo.alt"
          :src="logo.src"
          :alt="logo.alt"
          class="transition duration-200"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import duyTanUniversity from "@/assets/images/image_duytan.png";
import imgBaoTang from "@/assets/images/image_baotang.png";
import imgVr360 from "@/assets/images/image_vr360.png";

const logos = [
  { src: duyTanUniversity, alt: "Duy Tan University" },
  { src: imgBaoTang, alt: "Da Nang Museum" },
  { src: imgVr360, alt: "VR360" },
];
</script>

<style scoped>
/* Add any additional styling here */
</style>
