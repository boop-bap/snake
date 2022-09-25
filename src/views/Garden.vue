<template>
  <div class="garden" @click="setFocus">
    <div :style="{ top, left }" class="test">
      <Snake ref="snake" @move="move" />
    </div>
    <!-- <div v-for="(snakeBlock, index) in snake" :key="index">
      <div
        :style="{ top: snakeBlock.top, left: snakeBlock.left }"
        class="hello"
      >
        {{ snakeBlock.top }}
        {{ snakeBlock.left }}
        qwqwe
      </div>
    </div> -->

    <div
      v-for="(snakeBlock, index) in snake"
      :key="index"
      :style="{ top: snakeBlock.top + 'px', left: snakeBlock.left + 'px' }"
      class="hello"
    >
      <Snake />
    </div>

    <button @click="testing">test</button>
    <button @click="reset">reset</button>

    {{ currentPosition }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Snake from "../components/Snake.vue";

interface ComponentData {
  xPosition: number;
  yPosition: number;
  intervalDirection: any;
  interval?: any;
  intervalSpeed: number;
  loading: boolean;
  snakeLength: number;
  snake: { top: number | string; left: number | string }[];
  snakelength: number;
  hasEaten: boolean;
}

export default Vue.extend({
  components: {
    Snake,
  },

  data(): ComponentData {
    return {
      xPosition: 0,
      yPosition: 0,
      intervalDirection: null,
      interval: null,
      intervalSpeed: 300,
      loading: true,
      snakeLength: 1,
      snake: [],
      //one interval equals one snake block
      snakelength: 300,
      hasEaten: false,
    };
  },

  computed: {
    top(): string {
      return this.yPosition + "px";
    },
    left(): string {
      return this.xPosition + "px";
    },
    currentPosition(): string {
      return this.yPosition + "px" + this.xPosition + "px";
    },
  },

  watch: {},

  methods: {
    setFocus() {
      this.$refs.snake.$el.focus();
    },
    testing() {
      this.snakelength = 900;
      // this.hasEaten = true;
      // this.yPosition += 50;
      // this.xPosition += 50;
      // this.snake.push({
      //   left: this.xPosition,
      //   top: this.yPosition,
      // });
      // this.hello.push((Math.random() * 10).toString());
      // console.log(this.snake);
      // console.log(this.hello);
    },
    reset() {
      console.log(this.snake);
    },
    stopInterval(interval): void {
      clearInterval(interval);
    },

    moveRight() {
      if (this.xPosition <= 900) {
        this.xPosition += 50;
      } else {
        clearInterval(this.interval);
      }
    },

    moveLeft() {
      if (!(this.xPosition <= 0)) {
        this.xPosition -= 50;
      } else {
        clearInterval(this.interval);
      }
    },

    moveUp() {
      if (!(this.yPosition <= 0)) {
        this.yPosition -= 50;
      } else {
        clearInterval(this.interval);
      }
    },

    moveDown() {
      if (this.yPosition <= 900) {
        this.yPosition += 50;
      } else {
        clearInterval(this.interval);
      }
    },

    addSnake() {
      this.snake.unshift({ left: this.xPosition, top: this.yPosition });
    },

    removeSnake() {
      setTimeout(() => {
        this.snake.pop();
        clearTimeout();
      }, this.snakelength);
    },

    move(event: string) {
      this.stopInterval(this.interval);
      this.stopInterval(this.addSnake);
      this.stopInterval(this.removeSnake);

      setInterval(this.addSnake, this.intervalSpeed);
      setInterval(this.removeSnake, this.intervalSpeed);

      if (event === "ArrowRight") {
        this.intervalDirection = this.moveRight;
      } else if (event === "ArrowLeft") {
        this.intervalDirection = this.moveLeft;
      } else if (event === "ArrowUp") {
        this.intervalDirection = this.moveUp;
      } else if (event === "ArrowDown") {
        this.intervalDirection = this.moveDown;
      } else {
        this.intervalDirection = null;
      }

      this.interval = setInterval(this.intervalDirection, this.intervalSpeed);
    },
  },
});
</script>

<style lang="scss" scoped>
.garden {
  width: 1000px;
  height: 1000px;
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
.hello {
  width: 50px;
  height: 50px;
  position: absolute;
}
</style>
