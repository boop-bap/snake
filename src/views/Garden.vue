<template>
  <div class="garden" @click="setFocus">
    {{ this.snake.length }}
    <div
      class="movable"
      :style="{ top: foodPosition.y + 'px', left: foodPosition.x + 'px' }"
    >
      <Food />
    </div>

    <button @click="startFeeding">test</button>
    <button @click="reset">reset</button>

    <div :style="{ top, left }" class="movable">
      <Snake ref="snake" @move="move" />
    </div>

    <div
      v-for="(snakeBlock, index) in snake"
      :key="index"
      :style="{ top: snakeBlock.top + 'px', left: snakeBlock.left + 'px' }"
      class="hello"
    >
      <Snake />
    </div>

    {{ currentPosition }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Snake from "../components/Snake.vue";
import Food from "../components/Food.vue";

interface ComponentData {
  snakePosition: {
    x: number;
    y: number;
  };
  foodPosition: {
    x: number;
    y: number;
  };
  intervalDirection: any;
  interval?: any;
  feedingInterval: any;
  intervalSpeed: number;
  loading: boolean;
  snake: { top: number | string; left: number | string }[];
  snakeLength: number;
  hasEaten: boolean;
  test: any;
}

export default Vue.extend({
  components: {
    Snake,
    Food,
  },

  data(): ComponentData {
    return {
      snakePosition: {
        x: 0,
        y: 0,
      },

      foodPosition: {
        x: 0,
        y: 0,
      },
      intervalDirection: null,
      interval: null,
      intervalSpeed: 300,
      feedingInterval: null,
      loading: true,
      snake: [],
      //one interval of 300ms equals one snake block
      snakeLength: 300,
      hasEaten: false,
      test: false,
    };
  },

  computed: {
    top(): string {
      return this.snakePosition.y + "px";
    },
    left(): string {
      return this.snakePosition.x + "px";
    },
    currentPosition(): string {
      return this.snakePosition.y + "px" + this.snakePosition.x + "px";
    },
  },

  watch: {
    snakePosition: {
      handler(val) {
        if (JSON.stringify(val) === JSON.stringify(this.foodPosition)) {
          this.snakeLength += 300;
          if (this.feedingInterval) {
            // sometimes multiple food placements happen, need to solve.
            this.stopInterval(this.feedingInterval);
            this.placeFood();

            setTimeout(() => {
              this.feedingInterval = setInterval(this.placeFood, 3000);
            }, 3000);
          }
        }
      },
      deep: true,
    },
  },

  methods: {
    setFocus() {
      this.$refs.snake.$el.focus();
    },
    startFeeding() {
      if (!this.test) {
        this.test = true;

        this.placeFood();
        setTimeout(() => {
          this.feedingInterval = setInterval(this.placeFood, 3000);
        }, 3000);
      }
    },

    reset() {
      this.stopInterval(this.feedingInterval);
    },

    stopInterval(interval): void {
      clearInterval(interval);
    },

    moveRight() {
      if (this.snakePosition.x <= 900) {
        this.snakePosition.x += 50;
      } else {
        clearInterval(this.interval);
      }
    },

    moveLeft() {
      if (!(this.snakePosition.x <= 0)) {
        this.snakePosition.x -= 50;
      } else {
        clearInterval(this.interval);
      }
    },

    moveUp() {
      if (!(this.snakePosition.y <= 0)) {
        this.snakePosition.y -= 50;
      } else {
        clearInterval(this.interval);
      }
    },

    moveDown() {
      if (this.snakePosition.y <= 900) {
        this.snakePosition.y += 50;
      } else {
        clearInterval(this.interval);
      }
    },

    addSnake() {
      this.snake.unshift({
        left: this.snakePosition.x,
        top: this.snakePosition.y,
      });
    },

    removeSnake() {
      setTimeout(() => {
        this.snake.pop();
        clearTimeout();
      }, this.snakeLength);
    },

    move(event: string) {
      this.startFeeding();

      this.stopInterval(this.interval);
      // this.stopInterval(this.addSnake);
      // this.stopInterval(this.removeSnake);

      setInterval(this.removeSnake, this.intervalSpeed);
      setInterval(this.addSnake, this.intervalSpeed);

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

    placeFood() {
      const randomY = Math.floor(Math.random() * 10) * 50;
      const randomX = Math.floor(Math.random() * 10) * 50;

      this.foodPosition.y = randomY;
      this.foodPosition.x = randomX;
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
.movable {
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
