<template>
  <div
    class="text-white p-8 container mx-auto mt-8"
    style="background-color: rgba(128, 128, 128, 0.5)"
  >
    <div class="mx-auto w-1/2 text-center mt-12">
      <span class="text-lg py-5 text-[#C59B48]">CONTACT</span>
      <h1 class="text-3xl font-bold mb-4 py-6 tracking-widest">
        Let’s Talk About Your Experience
      </h1>
    </div>
    <div class="flex">
      <div class="w-1/2 py-8">
        <div class="mb-6">
          <h2 class="text-lg">Opening Hours</h2>
          <p>Daily: 9:30 AM - 6:00 PM</p>
          <p>Sunday & Holidays: Closed</p>
        </div>
        <div class="mb-6">
          <h2 class="text-lg">Contact Info</h2>
          <p>Địa chỉ: Số 01 - 03, đường Duy Tân, quận Hải Châu, TP. Đà Nẵng.</p>
          <p>Giờ mở cửa: 7:30 - 16:30 mỗi ngày.</p>
          <p>Email: danangmuseum@dtu.edu.vn</p>
          <p>Phone: +84 905 90 70 73</p>
        </div>
      </div>

      <div class="w-1/2">
        <form @submit.prevent="sendFeedback" class="mb-6 px-12 py-8 text-black">
          <input
            v-model="feedback.full_name"
            type="text"
            placeholder="Your name*"
            class="w-full p-2 mb-4 rounded"
            required
          />
          <input
            v-model="feedback.email"
            type="email"
            placeholder="Your email*"
            class="w-full p-2 mb-4 rounded"
            required
          />
          <select
            v-model="feedback.subject"
            class="w-full p-2 mb-4 rounded"
            required
          >
            <option>Discuss for</option>
            <option>For tickets</option>
            <option>For feedback</option>
            <option>For contribution</option>
            <option>For membership</option>
          </select>
          <textarea
            v-model="feedback.content"
            placeholder="Your Message"
            class="w-full p-2 mb-4 rounded"
            required
          ></textarea>
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
            Send
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useFeedbackStore } from "~/stores/feedback";
import type { FeedbackRequest } from "~/types/feedback";

definePageMeta({
  layout: "default",
});

const feedbackStore = useFeedbackStore();

const feedback = ref<FeedbackRequest>({
  user_id: 0,
  content: "",
  full_name: "",
  email: "",
  subject: "",
});

const sendFeedback = async () => {
  try {
    await feedbackStore.addFeedback(feedback.value);
    alert("Feedback sent successfully");
    // Reset feedback form if needed
    feedback.value = {
      user_id: 0,
      content: "",
      full_name: "",
      email: "",
      subject: "",
    };
  } catch (error) {
    console.error(error);
    alert("Failed to send feedback. Please try again.");
  }
};
</script>
