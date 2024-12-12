<template>
  <div class="flex">
    <!-- Thanh Sidebar -->
    <Sidebar />
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
// const { ssrContext } = useNuxtApp();
import Sidebar from "~/components/SideBarAdmin.vue";
</script>
