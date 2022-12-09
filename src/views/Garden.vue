<template>
  <div>
    <button @click="reset">reset</button>
    {{ this.snake.length }}
    {{ currentPosition }}

    <div
      :style="{ height: arenaHeight + 'px', width: arenaWidth + 'px' }"
      class="garden"
      @click="setFocus"
    >
      <div
        class="movable"
        :style="{ top: foodPosition.y + 'px', left: foodPosition.x + 'px' }"
      >
        <Food />
      </div>

      <div :style="{ top, left }" class="movable">
        <Snake ref="snake" @move="move" />
      </div>

      <div
        v-for="(snakeBlock, index) in snake"
        :key="index"
        :style="{ top: snakeBlock.y + 'px', left: snakeBlock.x + 'px' }"
        class="hello"
      >
        <Snake />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Snake from "../components/Snake.vue";
import Food from "../components/Food.vue";

interface ComponentData {
  isSnakeDisabled: boolean;
  isFeeding: boolean;

  snakeRemoveInterval: unknown;
  intervalDirection: any;
  snakeAddInterval: unknown;
  feedingInterval: unknown;
  headMoveInterval: any;

  snakeHeadPosition: {
    x: number;
    y: number;
  };

  foodPosition: {
    x: number;
    y: number;
  };

  intervalSpeed: number;
  snakeLength: number;
  arenaWidth: number;
  arenaHeight: number;

  snake: { y: number | string; x: number | string }[];
}

export default Vue.extend({
  components: {
    Snake,
    Food,
  },

  data(): ComponentData {
    return {
      isSnakeDisabled: false,
      isFeeding: false,

      snakeRemoveInterval: null,
      snakeAddInterval: null,

      intervalDirection: null,
      headMoveInterval: null,

      feedingInterval: null,

      snakeHeadPosition: {
        x: 0,
        y: 0,
      },

      foodPosition: {
        x: 0,
        y: 0,
      },

      //length and interval speed has to match
      intervalSpeed: 100,
      snakeLength: 100,
      arenaWidth: 500,
      arenaHeight: 500,

      snake: [],
    };
  },

  computed: {
    top(): string {
      return this.snakeHeadPosition.y + "px";
    },
    left(): string {
      return this.snakeHeadPosition.x + "px";
    },
    currentPosition(): string {
      return this.snakeHeadPosition.y + "px" + this.snakeHeadPosition.x + "px";
    },
  },

  watch: {
    snakeHeadPosition: {
      handler(val) {
        //Trying to escape this prison
        if (val.x > 475 || val.x < 0 || val.y > 475 || val.y < 0) {
          this.stopAll();
          this.isSnakeDisabled = true;
        }

        if (JSON.stringify(val) === JSON.stringify(this.foodPosition)) {
          this.snakeLength += 100;
          this.reRunFoodInterval();
        }

        // Self cannibalism || free food?
        for (const [index, snakePart] of this.snake.entries()) {
          if (JSON.stringify(val) === JSON.stringify(snakePart)) {
            this.stopAll();
            this.isSnakeDisabled = true;
            break;
          }

          if (
            JSON.stringify(this.foodPosition) === JSON.stringify(snakePart) &&
            index > 0
          ) {
            this.reRunFoodInterval();
          }
        }
      },
      deep: true,
    },
  },

  methods: {
    setFocus() {
      (this.$refs.snake as any).$el.focus();
    },

    startFeeding() {
      if (!this.isFeeding) {
        this.isFeeding = true;

        this.placeFood();
        setTimeout(() => {
          this.feedingInterval = setInterval(this.placeFood, 3000);
        }, 3000);
      }
    },

    reRunFoodInterval() {
      this.stopInterval(this.feedingInterval);
      this.placeFood();
      this.feedingInterval = setInterval(this.placeFood, 3000);
    },

    placeFood() {
      const randomY = Math.floor(Math.random() * 10) * 25;
      const randomX = Math.floor(Math.random() * 10) * 25;

      this.foodPosition.y = randomY;
      this.foodPosition.x = randomX;
    },

    stopAll() {
      this.stopInterval(this.headMoveInterval);
      this.stopInterval(this.feedingInterval);
      this.stopInterval(this.snakeRemoveInterval);
      this.stopInterval(this.snakeAddInterval);
    },

    reset() {
      this.stopAll();
      this.snakeHeadPosition = {
        x: 0,
        y: 0,
      };
      this.foodPosition = {
        x: 0,
        y: 0,
      };
      this.snake = [];
      this.snakeLength = 100;
      this.isSnakeDisabled = false;

      this.isSnakeDisabled = false;
      this.isFeeding = false;

      this.snakeRemoveInterval = null;
      this.snakeAddInterval = null;

      this.intervalDirection = null;
      this.headMoveInterval = null;

      this.feedingInterval = null;
    },

    move(event: string) {
      if (!this.isSnakeDisabled) {
        this.startFeeding();

        this.stopInterval(this.headMoveInterval);
        this.stopInterval(this.snakeRemoveInterval);
        this.stopInterval(this.snakeAddInterval);

        this.snakeRemoveInterval = setInterval(
          this.removeSnake,
          this.intervalSpeed
        );
        this.snakeAddInterval = setInterval(this.addSnake, this.intervalSpeed);

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

        this.headMoveInterval = setInterval(
          this.intervalDirection,
          this.intervalSpeed
        );
      }
    },

    moveRight() {
      if (this.snakeHeadPosition.x <= 450) {
        this.snakeHeadPosition.x += 25;
      } else {
        this.snakeHeadPosition.x += 1;
        clearInterval(this.headMoveInterval);
      }
    },

    moveLeft() {
      if (!(this.snakeHeadPosition.x <= 0)) {
        this.snakeHeadPosition.x -= 25;
      } else {
        this.snakeHeadPosition.x -= 1;
        clearInterval(this.headMoveInterval);
      }
    },

    moveUp() {
      if (!(this.snakeHeadPosition.y <= 0)) {
        this.snakeHeadPosition.y -= 25;
      } else {
        this.snakeHeadPosition.y -= 1;
        clearInterval(this.headMoveInterval);
      }
    },

    moveDown() {
      if (this.snakeHeadPosition.y <= 450) {
        this.snakeHeadPosition.y += 25;
      } else {
        this.snakeHeadPosition.y += 1;
        clearInterval(this.headMoveInterval);
      }
    },

    addSnake() {
      this.snake.unshift({
        x: this.snakeHeadPosition.x,
        y: this.snakeHeadPosition.y,
      });
    },

    removeSnake() {
      setTimeout(() => {
        this.snake.pop();
        clearTimeout();
      }, this.snakeLength);
    },

    stopInterval(interval): void {
      clearInterval(interval);
    },
  },
});
</script>

<style lang="scss" scoped>
.garden {
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
