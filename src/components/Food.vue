<template>
  <div class="food">
    <img :src="getImageUrl(gameFoodTypeFromDefaults)" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  gameFoodTypeFromDefaults: {
    type: String,
    default: "whitegg.svg",
  },

  userCustomFoodType: {
    type: String,
    default: null,
  },
});

const getImageUrl = (name?: string) => {
  if (props.userCustomFoodType) {
    return props.userCustomFoodType;
  }

  return new URL(`../assets/svg/${name}`, import.meta.url).href;
};
</script>

<style lang="scss" scoped>
.food {
  width: 25px;
  height: 25px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
