<template>
  <!-- <div>
    {{ userProfile.userInfo }}
  </div> -->
  <!-- <div class="user-ticket-info">
    <h2>{{ user.name }}</h2>
    <p>Email: {{ user.email }}</p>
    <p>Event: {{ event.name }}</p>
    <p>Date: {{ event.date }}</p>
    <p>Ticket Number: {{ ticket.number }}</p>
  </div> -->

  <div
    class="text-white p-8 container mx-auto mt-8"
    style="background-color: rgba(128, 128, 128, 0.5)"
  >
    <!-- {{ userProfile.userInfo }} -->
    <div class="mx-auto w-1/2 text-center">
      <span class="text-lg py-10 text-[#C59B48]">User Profile</span>
      <h1 class="text-3xl font-bold mb-4 py-6 tracking-widest">
        Let's Change Your Information
      </h1>
    </div>
    <div class="flex">
      <div class="w-1/2 py-10">
        <div class="mb-6">
          <h2 class="text-lg font-bold text-[#C7C7C7]">Opening Hours</h2>
          <p>Daily: 9:30 AM - 6:00 PM</p>
          <p>Sunday & Holidays: Closed</p>
        </div>
        <div class="mb-6">
          <h2 class="text-lg font-bold text-[#C7C7C7]">Contact Info</h2>
          <p>Địa chỉ: Số 01 - 03, đường Duy Tân,</p>
          <p class="mb-2">quận Hải Châu, TP. Đà Nẵng.</p>
          <p class="mb-2">Email: danangmuseum@dtu.edu.vn</p>
          <p>Phone: (+84) 905 90 70 73</p>
        </div>
      </div>

      <div class="my-8 w-1/2">
        <form @submit.prevent="saveProfile" class="mb-6 px-12 py-8 text-black">
          <input
            v-model="saveProfile.name"
            type="text"
            placeholder="Your phone number"
            class="w-full p-2 mb-4 rounded"
            required
          />
          <button
            type="submit"
            class="bg-brown-500 text-white px-8 py-2 rounded-lg bg-[#B2A28C] flex justify-center"
          >
            <Icon
              class="pr-1"
              icon="material-symbols:send-rounded"
              width="24"
              height="24"
              style="color: white"
            />
            Save
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "~/stores/user-store";
import type { UserResponse } from "~/types/user";

const userProfile = useUserStore();

const profile = ref<UserResponse>();

// const saveProfile = async () => {};
const saveProfile = async () => {
  // await userProfile.updateUserProfile(saveProfile);
};
</script>

<style></style>
