<template>
  <div>
    <BannerBreadcrumds
      title="Shop"
      highlightText="Tickets"
      breadcrumbText="Tickets"
      backgroundImage="/images/shop-tickets.png"
    />

    <div class="container mx-auto flex">
      <FilterSidebar
        :categories="categories"
        :minPrice="0"
        :maxPrice="100"
        :times="times"
        @filter-changed="fetchTickets"
      />
      <div class="flex-1 p-4 bg-[#F9F8F3]">
        <div v-if="loading" class="text-center text-lg font-semibold">
          Loading tickets...
        </div>
        <div v-else>
          <!-- Ticket List -->
          <div class="grid grid-cols-1 gap-6">
            <nuxt-link
              :to="`/home/tickets/detail?ticket_id=${ticket.event_id}`"
              v-for="ticket in paginatedTickets"
              :key="ticket.event_id"
              class="flex items-center gap-4 p-4 rounded-lg shadow-md"
            >
              <!-- Ticket Image -->
              <div class="overflow-hidden rounded-lg bg-[#EFEDE0] p-16">
                <img
                  :src="`/images/${ticket.ticket_image}`"
                  alt="Ticket image"
                  class="w-full h-full object-cover"
                />
              </div>
              <!-- Ticket Details -->
              <div>
                <h3 class="text-xl font-semibold text-gray-800 py-6">
                  {{ ticket.ticket_name }}
                </h3>
                <p class="text-lg text-[#E58A00] mt-2">
                  {{ ticket.ticket_price }}$
                </p>
                <p class="text-gray-600 mt-2 text-sm">
                  {{ ticket.ticket_description }}
                </p>
                <p class="mt-4 text-sm text-gray-500 pt-5">
                  By
                  {{
                    events.find((event) => event.event_id === ticket.event_id)
                      ?.event_name
                  }}
                </p>
              </div>
            </nuxt-link>
          </div>

          <!-- Pagination -->
          <div class="flex justify-between items-center mt-6">
            <p class="text-sm text-gray-800 px-5 py-3 bg-[#EFEDE0]">
              Showing {{ startIndex }}-{{ endIndex }} of
              {{ totalTickets }} results
            </p>
            <div class="flex items-center gap-2">
              <button
                class="w-8 h-8 flex items-center justify-center bg-[#EFEDE0] text-gray-800 rounded hover:bg-gray-300"
                :disabled="currentPage === 1"
                @click="prevPage"
              >
                <span>&lt;</span>
              </button>
              <button
                v-for="page in totalPages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'w-8 h-8 flex items-center justify-center rounded',
                  currentPage === page
                    ? 'bg-gray-800 text-white'
                    : 'bg-[#EFEDE0] text-gray-800 hover:bg-gray-300',
                ]"
              >
                {{ page }}
              </button>
              <button
                class="w-8 h-8 flex items-center justify-center bg-[#EFEDE0] text-gray-800 rounded hover:bg-gray-300"
                :disabled="currentPage === totalPages"
                @click="nextPage"
              >
                <span>&gt;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue";
import BannerBreadcrumds from "@/components/banner/BannerBreadcrumds.vue";
import FilterSidebar from "@/components/FilterSidebar.vue";
import { useRoute } from "vue-router";
import { useEventTicketsStore } from "~/stores/event-tickets";
import type { TicketsResponse } from "~/types/event-tickets";
import { useCategoriesStore } from "~/stores/categories";
import type { CategoriesResponse } from "~/types/categories";
import { useEventStore } from "~/stores/event";
import type { EventResponse } from "~/types/event";

const eventTicketsStore = useEventTicketsStore();
const eventStore = useEventStore();
const categoriesStore = useCategoriesStore();

const tags = [
  "Portfolio",
  "Vogue",
  "Exhibition",
  "Gallery",
  "Children",
  "Vacationer",
];
const times = [
  { label: "Morning (08am - 12am)" },
  { label: "Afternoon (13pm - 17pm)" },
  { label: "Evening (18pm - 20pm)" },
];
const organizations = [
  "Activities",
  "Holiday",
  "Anniversary",
  "Product",
  "Children",
  "Advertised",
];

const route = useRoute();

const tickets = ref<TicketsResponse[]>([]);
const loading = ref(false);
const categories = ref<CategoriesResponse[]>([]);
const events = ref<EventResponse[]>([]);

const fetchTickets = async (filters: {
  category_id?: string;
  min_price?: number;
  max_price?: number;
  start_date?: string;
  end_date?: string;
}) => {
  loading.value = true;
  try {
    await eventTicketsStore.getAllTicketsByFilters(filters);
    tickets.value = eventTicketsStore.tickets;
  } catch (error) {
    console.error("Error fetching tickets:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  if (!route.query.category) {
    route.query.category = "";
  }
  fetchTickets({
    category_id:
      (route.query.category as string) === "all"
        ? ""
        : (route.query.category as string),
    min_price: 0,
    max_price: 100,
    // end_date: "2022-12-31",
    // start_date: "2022-01-01",
  });

  // Fetch categories on component mount
  await categoriesStore.fetchAllCategories();
  await eventStore.fetchEvents();
  categories.value = categoriesStore.categories;
  events.value = eventStore.events;
});

// Pagination logic
const currentPage = ref(1);
const itemsPerPage = 4;
const totalTickets = computed(() => tickets.value.length);
const totalPages = computed(() => Math.ceil(totalTickets.value / itemsPerPage));

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage + 1);
const endIndex = computed(() =>
  Math.min(startIndex.value + itemsPerPage - 1, totalTickets.value)
);

const paginatedTickets = computed(() =>
  tickets.value.slice(
    (currentPage.value - 1) * itemsPerPage,
    currentPage.value * itemsPerPage
  )
);

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const goToPage = (page: number) => {
  currentPage.value = page;
};

// Watch for changes in tickets to reset pagination
watch(tickets, () => {
  currentPage.value = 1; // Reset to first page when tickets change
});
</script>
