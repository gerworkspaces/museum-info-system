<template>
  <div>
    <HistoryOfMuseums />
    <GalleryCollection :galleryItems="galleryItems" />
    <VisitorInfo />
    <ReviewCard />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import HistoryOfMuseums from "@/components/HistoryOfMuseums.vue";
import GalleryCollection from "@/components/GalleryCollection.vue";
import VisitorInfo from "@/components/VisitorInfo.vue";
import ReviewCard from "@/components/ReviewCard.vue";

import type { GalleryItem } from "@/types/museums";
import { usePostsStore } from "~/stores/posts";
import { useUserStore } from "~/stores/user-store";
import type { PostsResponse } from "~/types/posts";
import type { UserResponse } from "~/types/user";

const newsStore = usePostsStore();
const userStore = useUserStore();
const route = useRoute();

const newsList = ref<PostsResponse[]>([]);
const userList = ref<UserResponse[]>([]);

const galleryItems = ref<GalleryItem[]>([]);

onMounted(async () => {
  await userStore.fetchAllUsers();
  await newsStore.fetchAllPosts();
});

watch(
  () => userStore.users,
  (newUsers) => {
    userList.value = newUsers;
  }
);

watch(
  () => newsStore.posts,
  (newPosts) => {
    newsList.value = newPosts;

    galleryItems.value = newsList.value.map((post) => {
      return {
        ...post,
        post_image: `/images/${post.post_image}`,
        author: userList.value.find((user) => user.user_id === post.user_id)
          ?.username,
      };
    });
  }
);

watch(
  () => route.query,
  async (newSearchQuery) => {
    if (newSearchQuery.search) {
      await newsStore.searchPosts(newSearchQuery.search.toString());
    }
  }
);
</script>
