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
            class="w-80 h-64 rounded-sm object-cover mb-4"
          />
          <h3 class="text-black text-lg font-semibold">{{ member.name }}</h3>
          <p class="text-gray-600">{{ member.role }}</p>
        </div>
      </div>

      <!-- Team Member Info -->
      <div class="w-1/2 px-56 py-48 text-black">
        <h2 class="text-2xl font-semibold mb-4">Our Team Member</h2>
        <p class="mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
          rhoncus viverra leo. Vivamus sollicitudin ex id libero pretium, mattis
          euism sit amet porttitor nibh cursus morbi lacus sem elicted.
        </p>

        <div v-for="(skill, index) in skills" :key="index" class="mb-4">
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
    name: "Quang Vo",
    role: "Scrum Master",
    image: memberImage,
  },
  {
    name: "Quang Vo",
    role: "Developer",
    image: memberImage,
  },
  {
    name: "Quang Vo",
    role: "UI/UX Designer",
    image: memberImage,
  },
  {
    name: "Quang Vo",
    role: "Developer",
    image: memberImage,
  },
]);

const skills = ref([
  { name: "UI/UX Designer", value: 90, color: "bg-yellow-500" },
  { name: "Dev", value: 85, color: "bg-blue-500" },
  { name: "Support", value: 75, color: "bg-green-500" },
]);
</script>

<style scoped></style>
