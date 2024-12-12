<template>
  <div>
    <Banner />
    <SecondBanner />
    <MuseumSlider />
    <Guides />
    <HelpedBy />
  </div>
</template>

<script setup lang="ts">
import Banner from "@/components/banner/Banner.vue";
import SecondBanner from "@/components/banner/SecondBanner.vue";
import MuseumSlider from "@/components/MuseumSlider/MuseumSlider.vue";
import Guides from "@/components/Guides.vue";
import HelpedBy from "@/components/HelpedBy.vue";

definePageMeta({
  layout: "default",
});
</script>
