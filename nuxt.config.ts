// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      script: [
        {
          src: "https://www.paypal.com/sdk/js?client-id=AdlzXyyOLTPydlHj5efSri-hn7luKxX0IToIwsnin9etgCF99I-pxiMoEAOP4lSTb3ik2Jy630RPsS1t&currency=USD",
          type: "text/javascript",
        },
      ],
    },
  },
  modules: ["nuxt-file-storage"],
  fileStorage: {
    mount: "C:/Learning/museum-info-system/public",
  },
  routeRules: {
    // User
    "/": { redirect: "/home" },
    "/about": { redirect: "/home/about" },
    "/news": { redirect: "/home/news" },
    "/tickets": { redirect: "/home/tickets" },
    "/tickets/detail": { redirect: "/home/tickets/detail" },
    "/events": { redirect: "/home/events" },
    "/museums": { redirect: "/home/museums" },
    "/profile": { redirect: "/home/profile" },

    // Admin
    "/museum-management": { redirect: "/admin/museum-management" },
    "/post-management": { redirect: "/admin/post-management" },
    "/post-type-management": { redirect: "/admin/post-type-management" },
    "/user-management": { redirect: "/admin/user-management" },
    "/role-management": { redirect: "/admin/role-management" },
    "/event-management": { redirect: "/admin/event-management" },
    "/event-ticket-management": { redirect: "/admin/event-ticket-management" },
    "/category-management": { redirect: "/admin/category-management" },
    "/feedback-management": { redirect: "/admin/feedback-management" },
    "/review-management": { redirect: "/admin/review-management" },
    "/payment-management": { redirect: "/admin/payment-management" },
    "/register": { redirect: "/register-account" },
  },
  ssr: true,
  css: ["@/assets/css/main.css", "@/assets/css/global.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
