<template>
  <div class="container mx-auto">
    <section class="text-white py-8 relative">
      <!-- Title positioned at the top-left corner -->
      <h2 class="text-2xl font-bold mt-8 absolute top-4 left-64">Guides</h2>

      <!-- Content section for guides -->
      <div class="flex justify-center space-x-4 px-4 mt-16">
        <div
          v-for="guide in guides"
          :key="guide.title"
          class="relative bg-gray-800 rounded-lg shadow-lg max-w-xs overflow-hidden"
        >
          <!-- Image with overlay -->
          <img
            :src="guide.image"
            :alt="guide.title"
            class="w-[360px] h-[380px] object-cover"
          />

          <!-- Text overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end"
          >
            <h3 class="text-lg font-semibold">{{ guide.title }}</h3>
            <p class="text-sm mt-1">{{ guide.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import museumGuideOne from "@/assets/images/museum_guide_1.png";
import museumGuideTwo from "@/assets/images/museum_guide_2.png";
import museumGuideThr from "@/assets/images/museum_guide_3.png";

const guides = [
  {
    title: "Antiquity",
    image: museumGuideOne,
    description:
      "Khuyên tai 2 đầu thú – đồ trang sức của cư dân văn hóa Sa Huỳnh, thu thập trong đợt khảo sát khu mộ chum tại Đồi Vàng, xã Đại Đồng, huyện Đại Lộc, tỉnh Quảng Nam – Đà Nẵng (nay là huyện Đại Lộc, tỉnh Quảng Nam) năm 1979, có niên đại cách ngày nay khoảng 2500 – 2000 năm.",
  },
  {
    title: "History",
    image: museumGuideTwo,
    description:
      "Tiền thời nhà Thanh – Trung Quốc hiệu “Thuận Trị thông bảo”, khai quật tại di chỉ khảo cổ học Vườn đình Khuê Bắc, phường Hòa Hải, quận Ngũ Hành Sơn, thành phố Đà Nẵng, năm 2001, có niên đại thế kỷ XVII.",
  },
  {
    title: "Ethnology",
    image: museumGuideThr,
    description:
      "Bình gốm Kendy phát hiện tại di chỉ Nam Thổ Sơn năm 2000, có niên đại thế kỷ thứ IX – XI.Bình gốm Kendy phát hiện tại di chỉ Nam Thổ Sơn năm 2000, có niên đại thế kỷ thứ IX – XI.",
  },
];
</script>

<style scoped>
/* Add any additional styling here */
</style>
