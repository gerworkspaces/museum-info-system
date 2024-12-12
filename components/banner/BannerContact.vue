<template>
  <section
    class="relative bg-black text-center bg-cover bg-center text-white py-20 px-4 bg-[url('@/assets/images/green_layer.png')]"
  >
    <h2 class="text-4xl font-bold mb-4 text-gold">MORE THAN 100 EXHIBITIONS</h2>
    <p class="text-2xl font-thin tracking-widest max-w-2xl mx-auto my-12">
      Every day more exhibits arrive in our museum. Do not wait and buy a ticket
      now.
    </p>
    <div class="flex justify-center space-x-28">
      <button class="bg-[#B2A28C] text-white py-2 px-6 rounded">
        Next Event
      </button>
      <button class="bg-[#808080] text-white py-2 px-6 rounded">
        Contact Us
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: "BannerContact",
};
</script>

<style scoped>
.text-gold {
  color: #d4af37; /* Màu vàng */
}
</style>
