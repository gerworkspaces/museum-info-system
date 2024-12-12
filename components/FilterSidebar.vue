<template>
  <div class="w-80 bg-[#C7C7C7] p-4 text-black">
    <!-- Museum By Category -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold bg-[#EFEDE0] text-black p-2 rounded">
        <a href="?category=all" class="hover:underline">Museum By Category</a>
      </h3>
      <ul class="flex flex-wrap gap-2 mt-3">
        <li v-for="category in props.categories" :key="category.category_id">
          <a
            :href="`?category=${encodeURIComponent(category.category_id)}`"
            class="hover:no-underline px-2 py-1 rounded bg-[#EFEDE0]"
          >
            {{ category.category_name }}
          </a>
        </li>
      </ul>
    </div>

    <!-- Filter By Price -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold bg-[#EFEDE0] text-black p-2 rounded">
        Filter By Price
      </h3>
      <input
        type="range"
        v-model="priceRange[0]"
        :min="minPrice"
        :max="maxPrice"
        class="w-full mt-2"
        @input="updateFilters"
      />
      <input
        type="range"
        v-model="priceRange[1]"
        :min="minPrice"
        :max="maxPrice"
        class="w-full"
        @input="updateFilters"
      />
      <div class="flex justify-between text-sm mt-2">
        <span>{{ priceRange[0] }}$</span>
        <span>{{ priceRange[1] }}$</span>
      </div>
    </div>

    <!-- Events By Tag -->
    <div class="mb-6" v-if="tags">
      <h3 class="text-lg font-semibold bg-[#EFEDE0] text-black p-2 rounded">
        Events By Tag
      </h3>
      <div class="flex flex-wrap gap-2 mt-2">
        <button
          v-for="tag in tags"
          :key="tag"
          @click="toggleTag(tag)"
          :class="{
            'bg-blue-200': selectedTags.includes(tag),
            'bg-gray-200': !selectedTags.includes(tag),
          }"
          class="px-2 py-1 rounded"
        >
          {{ tag }}
        </button>
      </div>
    </div>

    <!-- Filter By Time -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold bg-[#EFEDE0] text-black p-2 rounded">
        Filter By Time
      </h3>
      <div class="mt-2 space-y-2">
        <label v-for="time in times" :key="time.label">
          <input
            type="checkbox"
            :value="time.label"
            v-model="selectedTimes"
            @change="updateFilters"
          />
          <span class="ml-2">{{ time.label }}</span>
        </label>
      </div>
    </div>

    <!-- Event Organization -->
    <div v-if="organizations">
      <h3 class="text-lg font-semibold bg-[#EFEDE0] text-black p-2 rounded">
        Event Organization
      </h3>
      <div class="flex flex-wrap gap-2 mt-2">
        <button
          v-for="organization in organizations"
          :key="organization"
          @click="toggleOrganization(organization)"
          :class="{
            'bg-blue-200': selectedOrganizations.includes(organization),
            'bg-gray-200': !selectedOrganizations.includes(organization),
          }"
          class="px-2 py-1 rounded"
        >
          {{ organization }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from "vue";
import type { CategoriesResponse } from "~/types/categories";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  categories: {
    type: Array as PropType<CategoriesResponse[]>,
  },
  minPrice: Number,
  maxPrice: Number,
  tags: Array as () => string[] | undefined,
  times: Array as () => { label: string }[] | undefined,
  organizations: Array as () => string[] | undefined,
});

const priceRange = ref<number[]>([props.minPrice ?? 0, props.maxPrice ?? 0]);
const selectedTags = ref<string[]>([]);
const selectedTimes = ref<string[]>([]);
const selectedOrganizations = ref<string[]>([]);

const emit = defineEmits<
  (
    e: "filter-changed",
    filters: {
      category_id: string;
      min_price: number;
      max_price: number;
      tags: string[];
      times: string[];
      organizations: string[];
    }
  ) => void
>();

const updateFilters = () => {
  emit("filter-changed", {
    category_id: router.currentRoute.value.query.category?.toString() ?? "all",
    min_price: priceRange.value[0],
    max_price: priceRange.value[1],
    tags: selectedTags.value,
    times: selectedTimes.value,
    organizations: selectedOrganizations.value,
  });
};

const toggleTag = (tag: string) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter((t) => t !== tag);
  } else {
    selectedTags.value.push(tag);
  }
  updateFilters();
};

const toggleOrganization = (organization: string) => {
  if (selectedOrganizations.value.includes(organization)) {
    selectedOrganizations.value = selectedOrganizations.value.filter(
      (o) => o !== organization
    );
  } else {
    selectedOrganizations.value.push(organization);
  }
  updateFilters();
};
</script>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  background: #ddd;
  border-radius: 5px;
  outline: none;
}
</style>
