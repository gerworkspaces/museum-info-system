<template>
  <section
    class="relative bg-contain bg-center text-white py-20 px-4 mt-10"
    :style="{
      backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: showText ? 'auto' : fixedHeight,
    }"
  >
    <!-- Nội dung văn bản chỉ hiển thị nếu showText là true -->
    <div v-if="showText" class="max-w-2xl mx-auto p-8 rounded-lg text-center">
      <h1 class="text-4xl font-bold mb-4 tracking-wider">
        {{ title }}
        <span class="text-yellow-400">{{ highlightText }}</span>
      </h1>

      <div
        class="relative flex items-end justify-center mt-4 w-full max-w-md mx-auto text-2xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="39"
          height="39"
          viewBox="0 0 24 24"
        >
          <path
            fill="white"
            d="M6 19h3v-6h6v6h3v-9l-6-4.5L6 10zm-2 2V9l8-6l8 6v12h-7v-6h-2v6zm8-8.75"
          />
        </svg>
        <span>/ {{ breadcrumbText }}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "BannerBreadcrumds",
  props: {
    title: {
      type: String,
      default: "",
    },
    highlightText: {
      type: String,
      default: "",
    },
    breadcrumbText: {
      type: String,
      default: "",
    },
    backgroundImage: {
      type: String,
      default: null,
    },
    showText: {
      type: Boolean,
      default: true,
    },
    fixedHeight: {
      type: String,
      default: "320px",
    },
  },
};
</script>
