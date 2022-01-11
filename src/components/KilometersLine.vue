<template>
  <div>
    <div class="text">
      <div :class="{ min: min }">0</div>
      <div class="km" :style="`width: ${actualKmWidth}px`" v-if="!min && !max">
        {{ km }}
      </div>
      <div :class="{ max: max }">{{ kmMax }}</div>
    </div>
    <div class="line" ref="line"></div>
    <!-- <div class="debug">
      <p>line width: {{ lineWidth }}</p>
      <p>actual km width : {{ actualKmWidth }}</p>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "KilometersLine",
  props: {
    km: {
      type: Number,
      required: true,
      default: 0,
    },
  },

  data() {
    return {
      lineWidth: 0,
      kmMax: 1550,
      actualKmWidth: 0,
      min: false,
      max: false,
    };
  },

  mounted() {
    this.onLineWidthResize();
    window.addEventListener("resize", this.onLineWidthResize);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.onLineWidthResize);
  },

  methods: {
    onLineWidthResize() {
      this.lineWidth = this.$refs.line.clientWidth;
      this.calculateActualKmWidth();
    },

    calculateActualKmWidth() {
      this.actualKmWidth = (this.km * this.lineWidth) / this.kmMax;
      if (this.actualKmWidth <= 0) {
        this.min = true;
      } else if (this.actualKmWidth >= this.lineWidth) {
        this.max = true;
      }
    },
  },
};
</script>

<style scoped>
.text {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.line {
  width: 100%;
  height: 3px;
  background-color: lightcoral;
  border-radius: 5px;
}

.km {
  position: absolute;
  text-align: right;
}

.min,
.max {
  color: red;
}
</style>