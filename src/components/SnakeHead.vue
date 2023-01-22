<!-- <template>
  <div @keydown="move" tabindex="0" id="123" class="snake">
    <img src="../assets/img/snakeHead.png" alt="snake head" />
  </div>
</template>

<script lang="ts">
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
</script>

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
</style> -->
