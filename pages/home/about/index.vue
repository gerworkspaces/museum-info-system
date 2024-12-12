<template>
  <div>
    <BannerBreadcrumds
      title="About"
      highlightText="news"
      breadcrumbText="About"
      backgroundImage="/images/banner-about.png"
    />
    <AboutMuseum />
    <WhoWeAre />
    <OurStory />
    <WeWorkPlan />
    <TeamMember />
  </div>
</template>

<script lang="ts" setup>
import AboutMuseum from "@/components/AboutMuseum.vue";
import WhoWeAre from "@/components/WhoWeAre.vue";
import OurStory from "@/components/OurStory.vue";
import WeWorkPlan from "@/components/WeWorkPlan.vue";
import TeamMember from "@/components/TeamMember.vue";
import BannerBreadcrumds from "@/components/banner/BannerBreadcrumds.vue";
</script>
