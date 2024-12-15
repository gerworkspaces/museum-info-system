<template>
  <section class="py-10 flex justify-center">
    <div class="bg-cream p-10 w-3/4 flex text-black">
      <!-- Left Content Section -->
      <div class="w-1/2">
        <h2 class="text-4xl font-bold leading-tight mb-4 max-w-64">
          <span class="mr-10"> We work </span>
          <span> with planning </span>
        </h2>
        <p class="mb-6">
          My system has developed a project that allows booking event services.
          With our system, the main functions are:
        </p>
        <ul class="list-disc list-inside text-gray-700 space-y-2">
          <li>View each service package</li>
          <li>Service details</li>
          <li>View service progress</li>
          <li>Compare prices transparently</li>
          <li>Service management</li>
          <li>User management</li>
        </ul>
      </div>

      <!-- Right Statistics Section -->
      <div class="w-1/2 grid grid-cols-2 gap-x-10 gap-y-4 ml-10">
        <div class="text-center">
          <p class="text-2xl font-semibold">50</p>
          <p class="text-gray-600">Hours per week</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-semibold">50</p>
          <p class="text-gray-600">Lines Of Code</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-semibold">279</p>
          <p class="text-gray-600">Knowledge gained</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-semibold text-orange-500">500</p>
          <p class="text-gray-600">Awards</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
/* No additional logic needed */
</script>

<style scoped>
.bg-cream {
  background-color: #f7f2e8; /* Màu nền tương tự trong ảnh của bạn */
}
</style>
