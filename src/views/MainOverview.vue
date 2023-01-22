<template>
  <!-- <TopNav /> -->
  <LandingPagehero />
  <BottomNav />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TopNav from "@/components/TopNav.vue";
import BottomNav from "@/components/BottomNav.vue";
import LandingPagehero from "@/components/LandingPageHero.vue.vue";

export default defineComponent({
  components: {
    TopNav,
    BottomNav,
    LandingPagehero,
  },
  setup() {},
});
</script>
