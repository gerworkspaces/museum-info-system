<template>
  <section class="py-10 bg-[#333333]">
    <div class="container mx-auto flex justify-center">
      <!-- Text content -->
      <div class="w-1/2 text-white pr-8">
        <h2 class="text-4xl font-serif font-semibold mb-4 mt-4">
          About Our Museum
        </h2>
        <div class="mx-4 mt-8">
          <p class="text-lg mb-6 leading-relaxed">
            This project aims to develop a website that aggregates information
            from various individual museum websites in the Da Nang area. The
            website addresses the problem of dispersed information, which makes
            it difficult for users to find comprehensive details about local
            museums and their activities. By providing a centralized platform,
            the website will make it easier for users to access all the
            necessary information in one place. The target users include local
            residents, tourists, and history enthusiasts who want to explore the
            cultural and historical offerings of museums in Da Nang.
            Additionally, the museum system will benefit from a simplified way
            to promote their exhibits and events.
          </p>
          <p class="text-sm font-light mt-10">
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
