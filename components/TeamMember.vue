<template>
  <div class="py-10 bg-[#C7C7C7]">
    <div class="container mx-auto flex">
      <!-- Team Members Grid -->
      <div class="grid grid-cols-2 gap-5 w-1/2">
        <div
          v-for="(member, index) in teamMembers"
          :key="index"
          class="bg-gray-200 p-5 rounded-lg flex flex-col items-center shadow-md"
        >
          <img
            :src="member.image"
            alt="team_member"
            class="w-72 h-60 rounded-sm object-cover mb-4"
          />
          <h3 class="text-black text-lg font-semibold">{{ member.name }}</h3>
          <p class="text-gray-600">{{ member.role }}</p>
          <p class="text-gray-600">{{ member.role2 }}</p>
        </div>
      </div>

      <!-- Team Member Info -->
      <div class="w-1/2 px-28 py-44 text-black">
        <h2 class="text-3xl font-semibold mb-4">Our Team Member</h2>
        <p class="mb-6">
          This project aims to create a centralized website that aggregates
          information from various museum websites in Da Nang. By consolidating
          museum details, event updates, and ticket purchasing options, the
          project addresses the issue of scattered information and enhances user
          accessibility.
        </p>
        <span class="text-sm font-light mt-14">
          <ul class="list-disc ml-5">
            <li class="category">Scrum Master:</li>
            <li class="item">
              - Oversees project progress, timeline, and communication.
            </li>
            <li class="category">Product Owner:</li>
            <li class="item">
              - Develops the user interface. Responsible for backend
              development.
            </li>
            <li class="category">Developer:</li>
            <li class="item">
              - Perform testing, report bugs, document review.
            </li>
          </ul>
        </span>
        <div v-for="(skill, index) in skills" :key="index" class="mt-10 mb-4">
          <div class="flex justify-between items-center mb-1">
            <span>{{ skill.name }}</span>
            <span>{{ skill.value }}%</span>
          </div>
          <div
            class="relative w-full h-2 bg-gray-300 rounded-full overflow-hidden"
          >
            <div
              :class="skill.color"
              :style="{ width: skill.value + '%' }"
              class="h-2 rounded-full"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import memberImage from "@/assets/images/my-avt.png";

const teamMembers = ref([
  {
    name: "Võ Nguyễn Thanh Quang",
    role: "Scrum Master - Developer",
    role2: "UI/UX Designer",
    image: memberImage,
  },
  {
    name: "Trương Quang Nghĩa",
    role: "Product Owner",
    role2: "Developer",
    image: memberImage,
  },
  {
    name: "Nguyễn Khắc Chỉnh",
    role: "Developer",
    image: memberImage,
  },
  {
    name: "Trần Phước Định",
    role: "Developer",
    image: memberImage,
  },
]);

const skills = ref([
  { name: "UI/UX Designer", value: 90, color: "bg-yellow-500" },
  { name: "Dev", value: 85, color: "bg-blue-500" },
  { name: "Support", value: 90, color: "bg-green-500" },
]);
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
