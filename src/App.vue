<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <main
      class="relative w-full h-screen-w font-extrabold text-default sm:h-full sm:w-full 2xl:m-auto 2xl:w-screen-1/3 2xl:h-screen-w-1/3 "
      @touchstart.prevent="handleTouchStart"
      @touchend.prevent="handleTouchEnd"
    >
      <div class="z-0 grid grid-rows-4 gap-y-3 bg-board p-4 w-full h-full">
        <div
          v-for="(row, i) in board"
          :key="i"
          class="grid grid-cols-4 gap-x-3"
        >
          <Cell v-for="(cell, j) in row" :key="j" :number="cell" />
        </div>
      </div>
      <template v-if="result !== null">
        <TheDialog v-show="result.showDialog" :content="result" />
      </template>
    </main>
  </div>
</template>

<script>
import TheDialog from "./components/TheDialog.vue";
import Cell from "./components/Cell.vue";
import useBoard from "./store/useBoard.js";
const { getBoard, getResult, left, right, up, down } = useBoard();
export default {
  name: "App",
  components: { Cell, TheDialog },
  data() {
    return {
      board: getBoard(),
      result: getResult(),
      touchstartX: null,
      touchstartY: null,
      touchendX: null,
      touchendY: null,
    };
  },
  methods: {
    flushLeft() {
      left(this.board);
    },
    flushRight() {
      right(this.board);
    },
    flushUp() {
      up(this.board);
    },
    flushDown() {
      down(this.board);
    },

    handleTouchStart(ev) {
      this.touchstartX = ev.changedTouches[0].screenX;
      this.touchstartY = ev.changedTouches[0].screenY;
    },
    handleTouchEnd(ev) {
      this.touchendX = ev.changedTouches[0].screenX;
      this.touchendY = ev.changedTouches[0].screenY;
      this.handleGesture();
    },
    handleGesture() {
      const diffX = Math.abs(this.touchendX - this.touchstartX);
      const diffY = Math.abs(this.touchendY - this.touchstartY);
      const isHorizontal = diffX > diffY;
      const isVertical = diffY > diffX;
      if (isHorizontal) {
        this.touchendX < this.touchstartX && this.flushLeft();
        this.touchendX > this.touchstartX && this.flushRight();
        return;
      }
      if (isVertical) {
        this.touchendY < this.touchstartY && this.flushUp();
        this.touchendY > this.touchstartY && this.flushDown();
        return;
      }
    },
    handleKeyDown(e) {
      switch (e.key) {
        case "ArrowLeft":
          this.flushLeft();
          break;
        case "ArrowRight":
          this.flushRight();
          break;
        case "ArrowUp":
          this.flushUp();
          break;
        case "ArrowDown":
          this.flushDown();
          break;
        default:
      }
    },
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeyDown);
  },
};
</script>
