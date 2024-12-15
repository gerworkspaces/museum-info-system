<template>
  <section class="py-10 bg-[#333333]">
    <div class="container mx-auto flex justify-center">
      <!-- Text content -->
      <div class="w-1/2 text-white pr-8">
        <h2 class="text-4xl font-serif font-semibold mb-4 mt-12">Our story</h2>
        <div class="mx-4 mt-6">
          <p class="text-lg mb-6 leading-relaxed">
            The main goal of the Da Nang Museum project is to revolutionize the
            provision of an online platform that allows customers to
            conveniently search, compare and book event services. This helps
            create a more convenient and satisfying experience for customers.
            Our project also provides effective monitoring and management tools
            for owners and administrators, ensuring successful event
            organization. Ultimately, our goal is not only to bring convenience
            to customers and businesses, but also to help optimize business
            efficiency by providing statistical information to improve business
            strategies and maximize profitability.
          </p>
          <span class="text-sm font-light mt-16">
            <ul class="list-disc ml-5">
              <li class="category">Programming Language:</li>
              <li class="item">- TypeScript</li>
              <li class="item">- Tailwind</li>
              <li class="item">- Vue.JS</li>
              <li class="item">- MySQL</li>

              <li class="category">Development Tool:</li>
              <li class="item">- Visual Studio Code</li>
              <li class="item">- MySQL</li>
              <li class="item">- Postman</li>

              <li class="category">Framework:</li>
              <li class="item">- Nuxt.JS</li>
              <li class="item">- Node.JS</li>
            </ul>
          </span>
        </div>
      </div>

      <!-- Image content -->
      <div class="w-1/2 mt-16">
        <img
          :src="whoWeAreImg"
          alt="Museum exhibit"
          class="rounded-lg shadow-lg"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import whoWeAreImg from "@/assets/images/who-we-are.png";
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

.category {
  font-weight: bold;
  margin-bottom: 5px;
}

.item {
  margin-left: 20px;
}
</style>
