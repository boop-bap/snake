<template>
  <div class="garden">
    <div :style="{ top, left }" class="test">
      <Snake ref="snake" @upDown="upDown" @leftRight="leftRight" />
    </div>
    <button @click="stopInterval">asdasd</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Snake from "../components/Snake.vue";

interface ComponentData {
  xPosition: number;
  yPosition: number;
  direction: any;
  interval?: any;
  intervalSpeed: number;
  loading: boolean;
}

export default Vue.extend({
  components: {
    Snake,
  },

  data(): ComponentData {
    return {
      xPosition: 0,
      yPosition: 0,
      direction: null,
      interval: null,
      intervalSpeed: 500,
      loading: true,
    };
  },

  methods: {
    stopInterval(): void {
      clearInterval(this.interval);
    },

    leftRight(event: string) {
      console.log(123);

      this.stopInterval();

      const moveRight = () => {
        if (this.xPosition <= 450) {
          this.xPosition += 50;
        } else {
          clearInterval(this.interval);
        }
      };

      const moveLeft = () => {
        if (!(this.xPosition <= 0)) {
          this.xPosition -= 50;
        } else {
          clearInterval(this.interval);
        }
      };

      if (event === "ArrowRight") {
        this.direction = moveRight;
      }

      if (event === "ArrowLeft") {
        this.direction = moveLeft;
      }

      this.interval = setInterval(this.direction, this.intervalSpeed);
    },

    upDown(event: string) {
      this.stopInterval();

      const moveUp = () => {
        if (!(this.yPosition <= 0)) {
          this.yPosition -= 50;
        } else {
          clearInterval(this.interval);
        }
      };

      const moveDown = () => {
        if (this.yPosition <= 450) {
          this.yPosition += 50;
        } else {
          clearInterval(this.interval);
        }
      };

      if (event === "ArrowUp") {
        this.direction = moveUp;
      }

      if (event === "ArrowDown") {
        this.direction = moveDown;
      }

      this.interval = setInterval(this.direction, this.intervalSpeed);
    },
  },
  computed: {
    top(): string {
      return this.yPosition + "px";
    },
    left(): string {
      return this.xPosition + "px";
    },
  },
});
</script>

<style lang="scss" scoped>
.garden {
  width: 550px;
  height: 550px;
  background: cornflowerblue;
  z-index: 10000;
  position: relative;
  margin: 0 auto;
}
.test {
  width: 50px;
  height: 50px;
  position: absolute;
}
</style>
