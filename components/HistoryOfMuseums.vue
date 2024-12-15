<template>
  <section class="py-10 bg-[#333333] container mx-auto mt-10">
    <div class="flex justify-center px-44">
      <!-- Text content -->
      <div class="w-1/2 text-white pr-16">
        <p
          class="text-yellow-400 text-2xl uppercase tracking-wider font-semibold"
        >
          History of Museums
        </p>
        <h1 class="text-5xl font-bold mt-4">
          Welcome To Art and History Museum
        </h1>
        <p class="mt-5 text-gray-300">
          Manage a system of many museums in a museum must manage events with
          users participating in the event
        </p>
        <p class="mt-2 text-gray-300">Buy tickets online, accumulate points</p>
        <p class="mt-2 text-gray-300">
          And evaluate events, comment on artifacts - posts events, posts, ww
          are museum functions only - they are not on the same level as
          information of a museum
        </p>
        <p class="mt-2 text-gray-300">
          MUSEUM has actions - such as organizing events - storing artifacts
          museum organizes events sells tickets - free
        </p>
        <nuxt-link to="/museums">
          <div class="mx-4">
            <button
              class="mt-8 border border-gray-400 px-8 py-4 font-semibold text-gray-300 hover:bg-gray-700"
            >
              Read More
            </button>
          </div>
        </nuxt-link>
      </div>

      <!-- Image content -->
      <div class="w-1/2 pl-16">
        <img
          :src="historyMuseumImg"
          alt="Museum exhibit"
          class="rounded-lg shadow-lg"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import historyMuseumImg from "@/assets/images/history_museum.png";
</script>
