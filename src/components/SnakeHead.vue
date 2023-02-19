<template>
  <div ref="snakeHead" @keydown="move" tabindex="0" id="123" class="snake">
    <img src="../assets/img/snakeHead.png" alt="snake head" />
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from "vue";

const emit = defineEmits(["move"]);

interface ComponentData {
  currentDirection: string;
  desiredDirection: string;
  rotationDeg: number;
}

const componentData: ComponentData = reactive({
  currentDirection: "",
  desiredDirection: "",
  rotationDeg: 90,
});

const snakeHead = ref(null);
defineExpose({ snakeHead });

const shouldMove = computed(() => {
  if (componentData.currentDirection === "") {
    return true;
  }

  if (
    componentData.desiredDirection === "ArrowLeft" &&
    componentData.currentDirection === "ArrowRight"
  ) {
    return false;
  }

  if (
    componentData.desiredDirection === "ArrowRight" &&
    componentData.currentDirection === "ArrowLeft"
  ) {
    return false;
  }

  if (
    componentData.desiredDirection === "ArrowUp" &&
    componentData.currentDirection === "ArrowDown"
  ) {
    return false;
  }

  if (
    componentData.desiredDirection === "ArrowDown" &&
    componentData.currentDirection === "ArrowUp"
  ) {
    return false;
  }
  return true;
});

const move = (event: any) => {
  componentData.desiredDirection = event.key;

  if (shouldMove.value) {
    if (componentData.desiredDirection === "ArrowRight") {
      componentData.rotationDeg = 270;
    }
    if (componentData.desiredDirection === "ArrowLeft") {
      componentData.rotationDeg = 90;
    }
    if (componentData.desiredDirection === "ArrowUp") {
      componentData.rotationDeg = 180;
    }
    if (componentData.desiredDirection === "ArrowDown") {
      componentData.rotationDeg = 0;
    }

    componentData.currentDirection = event.key;
    emit("move", event.key, componentData.rotationDeg);
  }
};
</script>

<!-- <script lang="ts">
import vue from "vue";

interface ComponentData {
  currentDirection: string;
  desiredDirection: string;
  rotationDeg: number;
}
export default vue.extend({
  name: "SnakeHead",

  data(): ComponentData {
    return {
      currentDirection: "",
      desiredDirection: "",
      rotationDeg: 90,
    };
  },
  methods: {
    move(event) {
      this.desiredDirection = event.key;

      if (this.shouldMove) {
        if (this.desiredDirection === "ArrowRight") {
          this.rotationDeg = 270;
        }
        if (this.desiredDirection === "ArrowLeft") {
          this.rotationDeg = 90;
        }
        if (this.desiredDirection === "ArrowUp") {
          this.rotationDeg = 180;
        }
        if (this.desiredDirection === "ArrowDown") {
          this.rotationDeg = 0;
        }

        this.currentDirection = event.key;
        this.$emit("move", event.key, this.rotationDeg);
      }
    },
  },

  computed: {
    shouldMove(): boolean {
      if (this.currentDirection === "") {
        return true;
      }

      if (
        this.desiredDirection === "ArrowLeft" &&
        this.currentDirection === "ArrowRight"
      ) {
        return false;
      }

      if (
        this.desiredDirection === "ArrowRight" &&
        this.currentDirection === "ArrowLeft"
      ) {
        return false;
      }

      if (
        this.desiredDirection === "ArrowUp" &&
        this.currentDirection === "ArrowDown"
      ) {
        return false;
      }

      if (
        this.desiredDirection === "ArrowDown" &&
        this.currentDirection === "ArrowUp"
      ) {
        return false;
      }
      return true;
    },
  },
});
</script>  -->

<style lang="scss" scoped>
.snake {
  width: 25px;
  height: 25px;
  text-align: center;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
