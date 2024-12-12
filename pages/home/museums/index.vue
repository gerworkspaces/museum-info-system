<template>
  <div>
    <BannerBreadcrumds
      title="DaNang"
      highlightText="Museums"
      breadcrumbText="Museums"
      backgroundImage="/images/museums-banner-img.png"
    />
    <div class="container mx-auto flex">
      <div class="w-3/5">
        <div class="flex items-center align-baseline mb-3 mt-8">
          <div class="w-16 h-[2px] bg-yellow-500 mr-2"></div>
          <div class="text-yellow-500 text-lg uppercase tracking-wider">
            Venue
          </div>
        </div>

        <div class="ml-5 mb-8">
          <h2 class="text-xl font-semibold mb-2">Museum Locations</h2>
          <span>
            Are you looking for a unique and inspiring venue to visit? Consider
            checking out your local art museum! Art museums offer a wide variety
            of exhibits and programming that are sure to engage and educate
            visitors of all ages. Explore the new art and culture, Art museums
            offer chance to see & learn about art and cultural objects.
          </span>
        </div>
        <div
          class="my-8"
          v-for="museum in paginatedMuseums"
          :key="museum.museum_id"
        >
          <MuseumCard
            :title="museum.name"
            :description="museum.description"
            :imageUrl="museum.museum_image"
            :openingHours="`${museum.open_time} - ${museum.close_time}`"
            :location="museum.location"
          />
        </div>
      </div>
      <div class="w-2/5 px-12">
        <div class="text-white p-6 rounded-lg shadow-md mt-6 bg-[#333333]">
          <h3
            class="text-2xl font-semibold mb-4 pb-2 border-b-2 border-solid border-yellow-500 w-28"
          >
            Search
          </h3>
          <div class="flex items-center">
            <input
              type="text"
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              class="w-full bg-white text-black border border-gray-700 rounded-md p-3 outline-none"
              placeholder="Search..."
            />
          </div>
        </div>

        <div class="text-white p-6 rounded-lg shadow-md mt-6 bg-[#333333]">
          <h3
            class="text-2xl font-semibold mb-4 pb-2 border-b-2 border-solid border-yellow-500 w-28"
          >
            Categories
          </h3>
          <div class="flex items-center flex-wrap gap-4">
            <nuxt-link
              v-for="category in categoryList"
              :key="category.category_id"
              :to="`/home/museums?category_id=${category.category_id}`"
            >
              <div
                class="bg-yellow-300 text-gray-900 px-4 py-2 rounded-md cursor-pointer"
              >
                {{ category.category_name }}
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

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
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch } from "vue";
import MuseumCard from "@/components/MuseumCard.vue";
import type { MuseumsResponse } from "@/types/museums";
import BannerBreadcrumds from "@/components/banner/BannerBreadcrumds.vue";
import type { UserResponse } from "~/types/user";
import { useMuseumsStore } from "~/stores/museums";
import { useUserStore } from "~/stores/user-store";
import { useCategoriesStore } from "~/stores/categories";
import type { CategoriesResponse } from "~/types/categories";
import { Icon } from "@iconify/vue";
import { useRoute } from "vue-router";

const museumsStore = useMuseumsStore();
const userStore = useUserStore();
const categoryStore = useCategoriesStore();
const route = useRoute();

const museumsList = ref<MuseumsResponse[]>([]);
const userList = ref<UserResponse[]>([]);
const categoryList = ref<CategoriesResponse[]>([]);

const itemsPerPage = 4;
const currentPage = ref(1);
const searchQuery = ref("");

const totalPages = computed(() => {
  return Math.ceil(museumsList.value.length / itemsPerPage);
});

const paginatedMuseums = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return museumsList.value.slice(start, start + itemsPerPage);
});

onMounted(async () => {
  await museumsStore.fetchAllMuseums();
  await userStore.fetchAllUsers();
  await categoryStore.fetchAllCategories();
});

watch(
  () => museumsStore.museums,
  (newMuseums) => {
    museumsList.value = newMuseums;
  }
);

watch(
  () => userStore.users,
  (newUsers) => {
    userList.value = newUsers;
  }
);

watch(
  () => categoryStore.categories,
  (newCategories) => {
    categoryList.value = newCategories;
  }
);

watch(
  () => route.query,
  async (newQuery) => {
    if (newQuery.category_id) {
      await museumsStore.searchMuseums(
        searchQuery.value,
        newQuery.category_id?.toString()
      );
    } else {
      await museumsStore.fetchAllMuseums();
    }
  }
);

const handleSearch = async () => {
  await museumsStore.searchMuseums(
    searchQuery.value,
    route.query.category?.toString()
  );
};
</script>
