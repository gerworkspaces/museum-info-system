<template>
  <section class="py-10 bg-[#C7C7C7]">
    <div class="container mx-auto flex justify-center">
      <!-- Image content -->
      <div class="w-1/2">
        <img
          :src="whoWeAreImg"
          alt="Museum exhibit"
          class="rounded-lg shadow-lg"
        />
      </div>

      <!-- Text content -->
      <div class="w-1/2 text-black pr-8">
        <h2 class="text-4xl font-serif font-semibold mb-6 mt-6 ml-4">
          Who We Are
        </h2>
        <div class="mx-4 mt-1">
          <p class="text-lg mb-6 leading-relaxed">
            To keep up with today's increasingly changing technology trends, we
            want a truly flexible and easy project development model to adapt to
            that change. Our project will develop more new features in the
            future. We will continuously update and apply new technologies that
            increase the attractiveness and intelligence of the system.
          </p>
          <span class="text-sm font-light mt-16">
            <ul class="list-disc ml-5">
              <li>Extreme of Goods</li>
              <li>Museum's standard</li>
              <li>Software Development Officer</li>
            </ul>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import whoWeAreImg from "@/assets/images/who-we-are.png";
</script>

<style scoped></style>
