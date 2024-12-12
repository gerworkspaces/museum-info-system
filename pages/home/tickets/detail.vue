<template>
  <div class="container mx-auto p-6 bg-gray-100">
    <div class="flex flex-wrap">
      <!-- Left Section -->
      <div class="w-full lg:w-1/2">
        <img
          :src="ticketDetail.ticket_image"
          alt="Art Image"
          class="w-full h-auto object-cover rounded-lg"
        />
        <div class="flex gap-4 mt-4">
          <img
            v-for="(image, index) in gallery"
            :key="index"
            :src="image"
            alt="Gallery Image"
            class="w-24 h-24 object-cover rounded-md border border-gray-300 cursor-pointer hover:border-gray-400"
            @click="ticketDetail.ticket_image = image"
          />
        </div>
      </div>

      <!-- Right Section -->
      <div class="w-full lg:w-1/2 px-12 py-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">
          {{ ticketDetail.ticket_name }}
        </h1>
        <p class="text-gray-600">{{ dates }}</p>
        <p class="text-green-600 text-xl font-semibold my-4">
          {{ ticketDetail.ticket_price }} USD & Free Shipping
        </p>
        <div class="flex items-center gap-4 mb-6">
          <div
            class="flex items-center border border-gray-300 rounded-md text-black"
          >
            <button class="px-4 py-2" @click="decreaseQuantity">-</button>
            <input
              type="number"
              class="w-12 text-center border-none focus:outline-none"
              v-model="quantity"
            />
            <button class="px-4 py-2" @click="increaseQuantity">+</button>
          </div>
        </div>
        <p class="text-green-500">
          {{ ticketDetail.available_tickets }}: Tickets of Available
        </p>

        <div class="space-y-2 text-gray-800 mt-6">
          <p><strong>Duration:</strong> {{ duration }}</p>
          <p><strong>Categories:</strong> {{ ticketDetail.category_name }}</p>
        </div>
        <div class="mt-6 space-y-2 text-gray-600">
          <p>
            <strong>Delivery:</strong> Directly manages delivery for this
            product.
          </p>
          <p>
            <strong>Offer:</strong> 5% Instant discount on card transactions.
          </p>
          <p><strong>Payments:</strong> Secure payments.</p>
        </div>
        <button
          class="bg-[#B2A28C] text-black px-8 py-3 mt-4 rounded-md hover:bg-[#e1c398]"
          @click="handleBookTicket"
        >
          Book Tickets
        </button>
      </div>
    </div>

    <!-- Tabs Section -->
    <div class="mt-12 flex">
      <div class="w-1/2">
        <div class="flex gap-8 border-b pb-2 mb-4">
          <button
            v-for="(tab, index) in tabs"
            :key="index"
            @click="activeTab = tab"
            :class="{
              'border-b-2 border-yellow-600 font-semibold text-yellow-600':
                activeTab === tab,
              'text-gray-600': activeTab !== tab,
            }"
            class="text-lg pb-1"
          >
            {{ tab }}
          </button>
        </div>
        <div v-if="activeTab === 'Description'" class="text-gray-600">
          {{ ticketDetail.ticket_description }}
        </div>
        <div
          v-else-if="activeTab === 'Additional Information'"
          class="text-gray-600"
        >
          {{ additionalInfo }}
        </div>
        <div v-else class="text-gray-600">
          <div v-for="review in ticketDetail.reviews" :key="review.review_id">
            <div class="bg-white shadow-md rounded-lg p-6 max-w-md my-3">
              <div class="flex items-center mb-4">
                <!-- Avatar -->
                <img
                  src="https://via.placeholder.com/100"
                  alt="Avatar"
                  class="w-12 h-12 rounded-full border border-gray-300"
                />
                <div class="ml-4">
                  <!-- User Name -->
                  <h3 class="text-lg font-semibold text-gray-800">
                    {{ review.full_name }}
                  </h3>
                  <!-- Review Stars -->
                  <div class="flex items-center">
                    <span
                      v-for="star in 5"
                      :key="star"
                      :class="{
                        'text-yellow-500': review.rating >= star,
                        'text-gray-400': review.rating < star,
                      }"
                    >
                      <Icon
                        icon="material-symbols-light:kid-star"
                        width="24"
                        height="24"
                      />
                    </span>
                  </div>
                </div>
              </div>
              <!-- Review Content -->
              <p class="text-gray-600 text-sm">
                {{ review.content }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Review Form -->
      <div class="w-1/2 px-12 pb-8">
        <h2 class="text-lg font-semibold mb-4 text-gray-800">
          Let’s be the first to review & give us your opinion
        </h2>
        <form @submit.prevent="validateReview" class="space-y-4 text-black">
          <div class="flex items-center gap-4">
            <p class="text-gray-600">Your rating *</p>
            <div class="flex">
              <span
                v-for="star in 5"
                :key="star"
                @click="rating = star"
                :class="{
                  'text-yellow-500': rating >= star,
                  'text-gray-400': rating < star,
                }"
                class="material-icons cursor-pointer"
              >
                <Icon
                  icon="material-symbols-light:kid-star"
                  width="24"
                  height="24"
                />
              </span>
            </div>
          </div>
          <textarea
            v-model="content"
            class="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Your review *"
          ></textarea>
          <div class="flex gap-4">
            <input
              v-model="name"
              class="w-1/2 p-3 border border-gray-300 rounded-md"
              placeholder="Your Name *"
            />
            <input
              v-model="email"
              class="w-1/2 p-3 border border-gray-300 rounded-md"
              placeholder="Your Email *"
            />
          </div>
          <input
            v-model="subject"
            class="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Subject"
          />
          <button
            type="submit"
            class="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import { useEventTicketsStore } from "~/stores/event-tickets";
import type { TicketsResponse } from "~/types/event-tickets";
import { useEventStore } from "~/stores/event";
import type { ReviewEventRequest } from "~/types/event";
import { useUserStore } from "~/stores/user-store";

definePageMeta({
  middleware: "check-ticket-id",
});

const ticketStore = useEventTicketsStore();
const eventStore = useEventStore();
const userStore = useUserStore();
const route = useRoute();

const ticketDetail = ref<TicketsResponse>({} as TicketsResponse);

// Main Image and Gallery
const mainImage = ref("https://via.placeholder.com/400");
const gallery = ref([
  "https://via.placeholder.com/100",
  "https://via.placeholder.com/100",
  "https://via.placeholder.com/100",
]);

// Product Information
const title = ref("Multi abstract art");
const dates = ref(
  "Dates discover tour everyday from October 10 to December 25"
);
const quantity = ref(1);
const duration = ref("45 minutes");

const description = ref(
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
);
const additionalInfo = ref("No updated");

// Tabs
const tabs = computed(() => {
  return [
    "Description",
    "Additional Information",
    `Review(${ticketDetail.value.reviews?.length || 0})`,
  ];
});
const activeTab = ref("Description");

// Review Form
const rating = ref(0);
const content = ref("");
const name = ref("");
const email = ref("");
const subject = ref("");

// Methods
const increaseQuantity = () => {
  quantity.value++;
};
const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value--;
};
const submitReview = async () => {
  if (!userStore.userInfo?.user_id) {
    alert("Please login to submit a review.");
    navigateTo("/login");
    return;
  }
  const review: ReviewEventRequest = {
    type: "review",
    event_id: Number(route.query.ticket_id),
    user_id: userStore.userInfo?.user_id,
    subject: subject.value,
    email: email.value,
    full_name: name.value,
    content: content.value,
    rating: rating.value,
  };
  await eventStore.addReviewEvent(review);
  alert("Review submitted successfully");
  clearReviewForm();
  await ticketStore.fetchTicketById(Number(route.query.ticket_id));
};

const clearReviewForm = () => {
  rating.value = 0;
  content.value = "";
  name.value = "";
  email.value = "";
  subject.value = "";
};

const validateReview = () => {
  if (!rating.value) {
    alert("Please select a rating.");
    return;
  }
  if (!content.value) {
    alert("Please enter your review.");
    return;
  }
  if (!name.value) {
    alert("Please enter your name.");
    return;
  }
  if (!email.value) {
    alert("Please enter your email.");
    return;
  }

  submitReview();
};

const handleBookTicket = () => {
  if (!userStore.userInfo?.user_id) {
    alert("Please login to book a ticket.");
    navigateTo("/login");
    return;
  }
  const priceOrder = Number(ticketDetail.value.ticket_price) * quantity.value;
  console.log("Price Order: ", priceOrder);

  // Navigate to checkout with parameters
  navigateTo({
    path: "/home/payments/checkout",
    query: {
      userID: userStore.userInfo.user_id,
      eventID: ticketDetail.value.event_id,
      ticketQuantity: quantity.value,
    },
  });
};

onMounted(() => {
  ticketStore.fetchTicketById(Number(route.query.ticket_id));
});

watch(
  () => ticketStore.ticket,
  (newVal) => {
    ticketDetail.value = {
      ...newVal,
      ticket_image: newVal.ticket_image.split(",")[0].trim()
        ? `/images/${newVal.ticket_image.split(",")[0].trim()}`
        : mainImage.value,
    };

    gallery.value = newVal.ticket_image.split(",").map((image) => {
      return `/images/${image.trim()}`;
    });
  }
);
</script>
