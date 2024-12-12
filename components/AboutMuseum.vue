<template>
  <section class="py-10 bg-[#333333]">
    <div class="container mx-auto flex justify-center">
      <!-- Text content -->
      <div class="w-1/2 text-white pr-8">
        <h2 class="text-4xl font-serif font-semibold mb-4 mt-12">
          About Our Museum
        </h2>
        <div class="mx-4 mt-16">
          <p class="text-lg mb-6 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
            rhoncus viverra leo. Vivamus sollicitudin ex id libero pretium,
            mattis euism sit amet porttitor nibh cursus morbi lacus sem elicted.
          </p>
          <p class="text-sm font-light mt-16">
            C2SE.03 - Danang Museum Information System
          </p>
        </div>
      </div>

      <!-- Image content -->
      <div class="w-1/2">
        <img
          :src="aboutMuseumImg"
          alt="Museum exhibit"
          class="rounded-lg shadow-lg"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import aboutMuseumImg from "@/assets/images/about-museum.png";
</script>

<style scoped></style>
