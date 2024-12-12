<template>
  <div class="w-full">
    <div class="header-page p-6 border-b-2 border-solid flex justify-between">
      <h1 class="text-xl font-bold">User Profile</h1>
      <button @click.prevent="logout" class="flex items-center gap-2">
        <Icon icon="mdi:logout" class="text-2xl" />
        Logout
      </button>
    </div>
    <div class="container mx-auto mt-10">
      <div class="mt-8 bg-[#1D253B] shadow-md rounded p-6">
        <h3 class="text-xl font-semibold mb-4">Edit Profile</h3>
        <form class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              class="w-full border border-gray-300 rounded px-3 py-2 text-black"
              value="gerworkspaces"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Email address</label>
            <input
              type="email"
              class="w-full border border-gray-300 rounded px-3 py-2 text-black"
              value="admin@gmail.com"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">City</label>
            <input
              type="text"
              class="w-full border border-gray-300 rounded px-3 py-2 text-black"
              value="Danang"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Phone</label>
            <input
              type="text"
              class="w-full border border-gray-300 rounded px-3 py-2 text-black"
              value="+84 905 907 073"
            />
          </div>
        </form>
        <button class="mt-6 px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "~/stores/user-store";
import { Icon } from "@iconify/vue";
definePageMeta({
  layout: "admin",
});

const router = useRouter();
const userStore = useUserStore();
if (userStore.userInfo?.role_id === 2) {
  navigateTo("/home");
}

const logout = async () => {
  try {
    await $fetch("/api/auth", {
      method: "DELETE",
    });
    localStorage.removeItem("token"); // Remove token from local storage
    userStore.logout(); // Clear user info from store
    router.push("/login"); // Redirect to home page
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
onMounted(() => {});
</script>
