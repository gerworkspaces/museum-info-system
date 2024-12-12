<template>
  <div class="mt-10">
    <BannerBreadcrumds
      title="Our All"
      highlightText="Events"
      breadcrumbText="Events"
      backgroundImage="/images/banner-about.png"
    />

    <div class="my-8" v-for="(event, index) in paginatedEvents" :key="event.event_id">
      <component
        :is="index % 2 === 0 ? EventCardRight : EventCardLeft"
        :dateRange="event.event_date"
        :title="event.event_name"
        :description="event.description"
        :image="`/images/${event.event_image}`"
      />
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex items-center my-8 justify-center">
      <button
        @click="currentPage = 1"
        :disabled="currentPage === 1"
        class="px-1 py-2 bg-[#525F7F] transition-all duration-500 hover:bg-[#7b8dba] rounded-l-xl"
      >
        <Icon
          icon="material-symbols-light:keyboard-double-arrow-left"
          width="24"
          height="24"
        />
      </button>
      <button
        @click="currentPage--"
        :disabled="currentPage === 1"
        class="px-1 py-2 bg-[#525F7F] transition-all duration-500 hover:bg-[#7b8dba]"
      >
        <Icon
          icon="material-symbols-light:keyboard-arrow-left"
          width="24"
          height="24"
        />
      </button>
      <div class="flex mx-1">
        <span v-for="page in totalPages" :key="page">
          <button
            @click="currentPage = page"
            :class="{
              'font-bold': currentPage === page,
              'text-orange-400': currentPage !== page,
            }"
            class="px-4 py-2 bg-[#525F7F] transition-all duration-500 hover:bg-[#7b8dba]"
          >
            {{ page }}
          </button>
        </span>
      </div>
      <button
        @click="currentPage++"
        :disabled="currentPage === totalPages"
        class="px-1 py-2 bg-[#525F7F] transition-all duration-500 hover:bg-[#7b8dba]"
      >
        <Icon
          icon="material-symbols-light:keyboard-arrow-right"
          width="24"
          height="24"
        />
      </button>
      <button
        @click="currentPage = totalPages"
        :disabled="currentPage === totalPages"
        class="px-1 py-2 bg-[#525F7F] transition-all duration-500 hover:bg-[#7b8dba] rounded-r-xl"
      >
        <Icon
          icon="material-symbols-light:keyboard-double-arrow-right-rounded"
          width="24"
          height="24"
        />
      </button>
    </div>

    <ContactButton />
    <BannerContact />
  </div>
</template>

<script lang="ts" setup>
import EventCardRight from "@/components/EventCardRight.vue";
import EventCardLeft from "@/components/EventCardLeft.vue";
import ContactButton from "@/components/ContactButton.vue";
import BannerContact from "@/components/banner/BannerContact.vue";
import { useUserStore } from "~/stores/user-store";
import { useEventStore } from "~/stores/event";
import type { EventResponse } from "~/types/event";
import { ref, computed, onMounted, watch } from "vue";
import { Icon } from "@iconify/vue";

definePageMeta({
  layout: "default",
});

const userStore = useUserStore();
const router = useRouter();
const eventStore = useEventStore();

const events = ref<EventResponse[]>([]);
const currentPage = ref(1);
const itemsPerPage = 4; // Set the number of items per page

const totalPages = computed(() => {
  return Math.ceil(events.value.length / itemsPerPage);
});

const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return events.value.slice(start, start + itemsPerPage);
});

onMounted(async () => {
  await eventStore.fetchEvents();
});

watch(
  () => eventStore.events,
  (newEvents) => {
    events.value = newEvents;
    currentPage.value = 1;
  }
);
</script>
