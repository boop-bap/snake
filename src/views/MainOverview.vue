<template>
  <!-- <TopNav /> -->
  <LandingPagehero />
  <BottomNav />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
// import TopNav from "@/components/TopNav.vue";
import BottomNav from "@/components/BottomNav.vue";
import LandingPagehero from "@/components/LandingPageHero.vue.vue";

import userModule from "@/stores/userModule";

onMounted(() => {
  console.log(userModule().getCurrentUser);
  if (userModule().getCurrentUser) {
    console.log(12);
  }
});
</script>
