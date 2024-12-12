<template>
  <div class="p-6 space-y-6 container mx-auto">
    <h1 class="text-3xl font-bold text-center">Thanh toán với PayPal</h1>

    <!-- Hiển thị thông tin sự kiện và vé người dùng chọn -->
    <div class="p-6 rounded-lg shadow-lg">
      <img
        :src="`/images/${eventTicketStore.ticket.event_image
          ?.split(',')[0]
          .trim()}`"
        alt="Event Image"
        class="w-full h-48 object-cover mb-4"
      />
      <h2 class="text-2xl font-semibold">
        {{ eventTicketStore.ticket.event_name }}
      </h2>
      <p class="mt-2">
        <strong>Ngày tổ chức:</strong>
        {{
          new Date(eventTicketStore.ticket.event_date?.toString() || Date.now())
            .toISOString()
            .split("T")[0]
        }}
      </p>
      <p class="mt-2"><strong>Số lượng vé:</strong> {{ ticketQuantity }}</p>
      <p class="mt-2"><strong>Tổng tiền:</strong> {{ ticketPrice }} VND</p>
    </div>

    <!-- PayPal Button Container -->
    <div id="paypal-button-container" class="mx-auto mt-6 w-[500px]"></div>

    <!-- Hiển thị trạng thái thanh toán -->
    <div
      v-if="paymentStatus"
      class="mt-4 bg-gray-100 p-4 rounded-lg text-center text-sm text-green-700"
    >
      <p>{{ paymentStatus }}</p>
    </div>

    <!-- Payment Status Popup -->
    <div
      v-if="showPopup"
      class="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50"
      @click="closePopup"
    >
      <div
        class="bg-white p-6 rounded-lg shadow-lg text-center text-green-700"
        @click.stop
      >
        <h2 class="text-lg font-semibold">{{ paymentStatus }}</h2>
        <button
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          @click="closePopup"
        >
          Đóng
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useEventTicketsStore } from "~/stores/event-tickets";

const route = useRoute();
const router = useRouter();
const eventTicketStore = useEventTicketsStore();

const userID = route.query.userID;
const eventID = route.query.eventID;
const ticketQuantity = route.query.ticketQuantity;
const ticketPrice = ref(0);
const paymentStatus = ref("");
const showPopup = ref(false);

// Gọi API để tạo đơn hàng thanh toán
onMounted(async () => {
  await eventTicketStore.fetchTicketById(Number(eventID));

  const { data } = await useFetch("/api/payments/paypal", {
    method: "POST",
    body: { amount: "0.01" },
  });

  // Load PayPal SDK
  const script = document.createElement("script");
  script.src =
    "https://www.paypal.com/sdk/js?client-id=AdlzXyyOLTPydlHj5efSri-hn7luKxX0IToIwsnin9etgCF99I-pxiMoEAOP4lSTb3ik2Jy630RPsS1t";
  script.async = true;
  script.onload = () => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: ticketPrice.value, // Số tiền thanh toán
                },
              },
            ],
          });
        },
        onApprove: async (data) => {
          // Gửi thông tin giao dịch đến server để xử lý capture
          const res = await useFetch("/api/payments/capture", {
            method: "POST",
            body: {
              orderID: data.orderID,
              userID: userID,
              eventID: eventID,
              ticketQuantity: ticketQuantity,
            },
          });

          if (res.data.value.message === "Thanh toán thành công!") {
            paymentStatus.value = "Thanh toán thành công!";
          } else {
            paymentStatus.value = "Có lỗi xảy ra: " + res.data.value.message;
          }

          // Show popup notification
          showPopup.value = true;

          // Hide popup after 2 seconds and navigate to tickets page
          setTimeout(() => {
            showPopup.value = false;
            navigateTo("/home/tickets");
          }, 2000);
        },

        onError: (err) => {
          console.error(err);
          paymentStatus.value = "Đã xảy ra lỗi khi thanh toán";
          showPopup.value = true;

          // Hide popup after 2 seconds and navigate to tickets page
          setTimeout(() => {
            showPopup.value = false;
            router.push({ name: "tickets" }); // Navigate to tickets page
          }, 2000);
        },
      })
      .render("#paypal-button-container");
  };
  document.body.appendChild(script);
});

watch(
  () => eventTicketStore.ticket,
  (newVal) => {
    ticketPrice.value = Number(newVal.ticket_price) * Number(ticketQuantity);
  }
);

// Close popup manually
const closePopup = () => {
  showPopup.value = false;
  router.push({ name: "tickets" }); // Navigate to tickets page when closed
};
</script>
