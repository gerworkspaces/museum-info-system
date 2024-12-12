<template>
  <div class="bg-[#484848] text-white rounded-lg shadow-md">
    <img
      :src="`/images/${imageUrl}`"
      alt="Museum Image"
      class="w-full min-h-[300px] h-96 object-cover rounded-t-md mb-4"
    />
    <div class="px-14 py-4">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-semibold mb-2">{{ title }}</h2>

        <h3 class="text-base font-bold text-[#B2A28C] mb-2">
          OPEN DAILY: {{ openingHours }}
        </h3>
      </div>
      <div class="w-full h-[2px] bg-[#B7B7B7] my-6"></div>
      <p class="text-gray-300 mb-4">{{ description }}</p>
      <div class="flex justify-between items-center">
        <div class="text-sm text-[#848484] mt-4 flex items-center">
          <span class="material-icons text-[#B2A28C] mr-1">Location: </span>
          {{ location }}
        </div>

        <!-- Button redirect to contact page -->
        <button
          class="bg-[#B2A28C] text-white px-4 py-2 rounded-md"
          @click="redirectToContactPage"
        >
          Contact
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: {
      type: String,
      required: true,
    },
    openingHours: { type: String, required: true },
    location: { type: String, required: true },
  },
  methods: {
    redirectToContactPage() {
      this.$router.push("/home/feedback");
    },
  },
};
</script>

<style scoped>
.material-icons {
  font-size: 1rem;
}
</style>
