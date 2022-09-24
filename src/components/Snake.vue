<template>
  <div @keydown="move" tabindex="0" id="123" class="snake">Snake</div>
</template>

<script lang="ts">
import vue from "vue";

interface ComponentData {
  currentDirection: string;
  desirecDirection: string;
}
export default vue.extend({
  name: "Snake",

  data(): ComponentData {
    return {
      currentDirection: "",
      desirecDirection: "",
    };
  },
  methods: {
    move(event) {
      this.desirecDirection = event.key;

      if (this.shouldMove) {
        this.currentDirection = event.key;
        if (event.key === "ArrowUp" || event.key === "ArrowDown")
          this.$emit("upDown", event.key);
        if (event.key === "ArrowLeft" || event.key === "ArrowRight")
          this.$emit("leftRight", event.key);
      }
    },
  },

  computed: {
    shouldMove(): boolean {
      if (this.currentDirection === "") {
        return true;
      }

      if (
        this.desirecDirection === "ArrowLeft" &&
        this.currentDirection === "ArrowRight"
      ) {
        return false;
      }

      if (
        this.desirecDirection === "ArrowRight" &&
        this.currentDirection === "ArrowLeft"
      ) {
        return false;
      }

      if (
        this.desirecDirection === "ArrowUp" &&
        this.currentDirection === "ArrowDown"
      ) {
        return false;
      }

      if (
        this.desirecDirection === "ArrowDown" &&
        this.currentDirection === "ArrowUp"
      ) {
        return false;
      }
      return true;
    },
  },
});
</script>

<style lang="scss" scoped>
.snake {
  width: 50px;
  height: 50px;
  background: purple;
  text-align: center;
}
</style>
