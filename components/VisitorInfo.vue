<template>
  <section class="py-10 bg-[#333333] container mx-auto">
    <div class="flex justify-center px-44">
      <!-- Image content -->
      <div class="w-1/2 pr-16">
        <img
          :src="visitorInfoImg"
          alt="Museum exhibit"
          class="rounded-lg shadow-lg"
        />
      </div>

      <!-- Text content -->
      <div class="w-1/2 text-white pl-16 my-12">
        <p
          class="text-yellow-400 text-2xl uppercase tracking-wider font-semibold"
        >
          Visitor Information
        </p>
        <h1 class="text-4xl font-bold mt-4">
          Welcome to visit and take the time to introduce you to more historical
          information and knowledge you may enjoy.
        </h1>

        <div class="mt-8">
          <h3 class="text-lg font-semibold">Opening Hours</h3>
          <p class="text-gray-300">
            Monday - Friday .................. 09:00am - 8:30pm
          </p>
          <p class="text-gray-300">
            Saturday - Sunday ............... 09:00am - 1:30pm
          </p>
        </div>

        <div class="mt-8">
          <h3 class="text-lg font-semibold">Location</h3>
          <p class="text-gray-300">
            03 Quang Trung street, Hai Chau district, Danang city, 550000,
            Vietnam Vietnamese.<br />
            (+84) 123-456-789<br />
            danangmuseum@dtu.edu.vn
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import visitorInfoImg from "@/assets/images/visitor-info.png";
</script>
