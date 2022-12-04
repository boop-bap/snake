<template>
  <div class="food">
    <img :src="require(`../assets/svg/${foodType}`)" alt="white egg alt" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

// interface ComponentData {}

export default Vue.extend({
  props: {
    foodType: {
      type: String,
      default: "whitegg.svg",
    },
  },

  // data(): ComponentData {
  //   return {};
  // },
});
</script>

<style lang="scss" scoped>
.food {
  width: 50px;
  height: 50px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
