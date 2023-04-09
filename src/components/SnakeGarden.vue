<template>
  <div class="h-[calc(100vh-144px)]">
    <div class="pt-8 flex flex-wrap justify-center gap-4">
      <span>Player name: {{ userStore.currentUser.userName }} </span>
      <span class="flex">Score:{{ playerScore }} <Food /></span>
    </div>

    <!-- <select v-show="false" v-model="componentData.intervalSpeed">
      <option :value="200">0.5x speed</option>
      <option :value="133">0.75x speed</option>
      <option selected :value="100">1x speed</option>
      <option :value="50">2x speed</option>
      <option :value="33">3x speed</option>
      <option :value="25">4x speed</option>
    </select> -->

    <div
      :style="{
        height: componentData.arenaHeight + 'px',
        width: componentData.arenaWidth + 'px',
      }"
      class="garden"
      @click="setFocus"
    >
      <div
        v-if="componentData.headMoveInterval"
        class="movable"
        :style="{
          top: componentData.foodPosition.y + 'px',
          left: componentData.foodPosition.x + 'px',
        }"
      >
        <Food />
      </div>

      <div
        :style="{
          top,
          left,
          transform: `rotate(${componentData.snakeHeadRotationDeg}deg)`,
        }"
        class="movable"
      >
        <SnakeHead ref="snakeHead" @move="move" />
      </div>

      <div
        v-for="(snakeBlock, index) in componentData.snake"
        :key="index"
        :style="{ top: snakeBlock.y + 'px', left: snakeBlock.x + 'px' }"
        class="hello"
      >
        <SnakeBody />
      </div>
    </div>
    <button @click="reset">reset</button>
  </div>
</template>

<script setup lang="ts">
import { userModule } from "@/stores/userModule";

import SnakeHead from "@/components/SnakeHead.vue";
import SnakeBody from "@/components/SnakeBody.vue";
import Food from "@/components/Food.vue";

import { reactive, watch, computed, ref } from "vue";

const userStore = userModule();

interface ComponentData {
  isSnakeDisabled: boolean;
  isFeeding: boolean;

  snakeRemoveInterval: unknown;
  // eslint-disable-next-line
  intervalDirection: any;
  snakeAddInterval: unknown;
  feedingInterval: unknown;
  // eslint-disable-next-line
  headMoveInterval: any;

  snakeHeadPosition: {
    x: number;
    y: number;
  };

  foodPosition: {
    x: number;
    y: number;
  };
  snakeHeadRotationDeg: number;
  intervalSpeed: number;
  snakeLength: number;
  arenaWidth: number;
  arenaHeight: number;

  snake: { y: number | string; x: number | string }[];
}

const componentData: ComponentData = reactive({
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

  // length and interval speed has to match
  snakeHeadRotationDeg: 270,
  intervalSpeed: 100,
  snakeLength: 100,
  arenaWidth: 500,
  arenaHeight: 500,

  snake: [],
});

////
const snakeHead = ref();

const top = computed(() => {
  return componentData.snakeHeadPosition.y + "px";
});

const left = computed(() => {
  return componentData.snakeHeadPosition.x + "px";
});

const currentPosition = computed(() => {
  return (
    componentData.snakeHeadPosition.y +
    "px" +
    componentData.snakeHeadPosition.x +
    "px"
  );
});

let playerScore = ref(0);

////

watch(
  componentData.snakeHeadPosition,
  (val) => {
    //Trying to escape this prison
    if (val.x > 475 || val.x < 0 || val.y > 475 || val.y < 0) {
      stopAll();
      componentData.isSnakeDisabled = true;
    }

    if (JSON.stringify(val) === JSON.stringify(componentData.foodPosition)) {
      componentData.snakeLength += 100;
      playerScore.value++;

      reRunFoodInterval();
    }

    // Self cannibalism || free food?
    for (const [index, snakePart] of componentData.snake.entries()) {
      if (JSON.stringify(val) === JSON.stringify(snakePart)) {
        stopAll();
        componentData.isSnakeDisabled = true;
        break;
      }

      if (
        JSON.stringify(componentData.foodPosition) ===
          JSON.stringify(snakePart) &&
        index > 0
      ) {
        reRunFoodInterval();
      }
    }
  },
  { deep: true }
);

const setFocus = () => {
  snakeHead.value.snakeHead.focus();
};

const startFeeding = () => {
  if (!componentData.isFeeding) {
    componentData.isFeeding = true;

    placeFood();
    setTimeout(() => {
      componentData.feedingInterval = setInterval(placeFood, 4000);
    }, 4000);
  }
};

const reRunFoodInterval = () => {
  stopInterval(componentData.feedingInterval);
  placeFood();
  componentData.feedingInterval = setInterval(placeFood, 3000);
};

const placeFood = () => {
  const randomY = Math.floor(Math.random() * 10) * 25;
  const randomX = Math.floor(Math.random() * 10) * 25;

  componentData.foodPosition.y = randomY;
  componentData.foodPosition.x = randomX;
};

const stopAll = () => {
  stopInterval(componentData.headMoveInterval);
  stopInterval(componentData.feedingInterval);
  stopInterval(componentData.snakeRemoveInterval);
  stopInterval(componentData.snakeAddInterval);
};

const reset = () => {
  playerScore.value = 0;

  stopAll();
  componentData.snakeHeadPosition = {
    x: 0,
    y: 0,
  };
  componentData.foodPosition = {
    x: 0,
    y: 0,
  };
  componentData.snake = [];
  componentData.snakeLength = 100;
  componentData.isSnakeDisabled = false;

  componentData.isSnakeDisabled = false;
  componentData.isFeeding = false;

  componentData.snakeRemoveInterval = null;
  componentData.snakeAddInterval = null;

  componentData.intervalDirection = null;
  componentData.headMoveInterval = null;

  componentData.feedingInterval = null;

  componentData.snakeHeadRotationDeg = 270;
};

const move = (direction: string, rotationDeg: number) => {
  if (!componentData.isSnakeDisabled) {
    componentData.snakeHeadRotationDeg = rotationDeg;
    startFeeding();

    stopInterval(componentData.headMoveInterval);
    stopInterval(componentData.snakeRemoveInterval);
    stopInterval(componentData.snakeAddInterval);

    componentData.snakeRemoveInterval = setInterval(
      removeSnake,
      componentData.intervalSpeed
    );
    componentData.snakeAddInterval = setInterval(
      addSnake,
      componentData.intervalSpeed
    );

    if (direction === "ArrowRight") {
      componentData.intervalDirection = moveRight;
    } else if (direction === "ArrowLeft") {
      componentData.intervalDirection = moveLeft;
    } else if (direction === "ArrowUp") {
      componentData.intervalDirection = moveUp;
    } else if (direction === "ArrowDown") {
      componentData.intervalDirection = moveDown;
    } else {
      componentData.intervalDirection = null;
    }

    componentData.headMoveInterval = setInterval(
      componentData.intervalDirection,
      componentData.intervalSpeed
    );
  }
};

const moveRight = () => {
  if (componentData.snakeHeadPosition.x <= 450) {
    componentData.snakeHeadPosition.x += 25;
  } else {
    componentData.snakeHeadPosition.x += 1;
    clearInterval(componentData.headMoveInterval);
  }
};

const moveLeft = () => {
  if (!(componentData.snakeHeadPosition.x <= 0)) {
    componentData.snakeHeadPosition.x -= 25;
  } else {
    componentData.snakeHeadPosition.x -= 1;
    clearInterval(componentData.headMoveInterval);
  }
};

const moveUp = () => {
  if (!(componentData.snakeHeadPosition.y <= 0)) {
    componentData.snakeHeadPosition.y -= 25;
  } else {
    componentData.snakeHeadPosition.y -= 1;
    clearInterval(componentData.headMoveInterval);
  }
};

const moveDown = () => {
  if (componentData.snakeHeadPosition.y <= 450) {
    componentData.snakeHeadPosition.y += 25;
  } else {
    componentData.snakeHeadPosition.y += 1;
    clearInterval(componentData.headMoveInterval);
  }
};

const addSnake = () => {
  componentData.snake.unshift({
    x: componentData.snakeHeadPosition.x,
    y: componentData.snakeHeadPosition.y,
  });
};

const removeSnake = () => {
  setTimeout(() => {
    componentData.snake.pop();
    clearTimeout();
  }, componentData.snakeLength);
};

const stopInterval = (interval: any) => {
  clearInterval(interval);
};
</script>

<style lang="scss" scoped>
.garden {
  background: cornflowerblue;
  z-index: 0;
  position: relative;
  margin: 0 auto;
}
.movable {
  width: 25px;
  height: 25px;
  position: absolute;
  *:focus {
    outline: none;
  }
}
.hello {
  width: 25px;
  height: 25px;
  position: absolute;
}
</style>
