<template>
  <div>
    {{ userInfo.userInfo }}
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '~/stores/user-store';

const userInfo = useUserStore()

</script>

<style>

</style>