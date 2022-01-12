<template>
  <div>
    <div class="text">
      <div :class="{ min: min }">0</div>
      <div class="km" :style="`width: ${actualKmWidth}px`" v-if="!min && !max">
        {{ km }} km
      </div>
      <div :class="{ max: max }">{{ kmMax }}</div>
    </div>
    <div class="line" ref="line">
      <div class="journey-line" :style="`width: ${actualKmWidth}px`"></div>
    </div>
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
    loading: {
      type: Boolean,
      default: false,
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

  watch: {
    loading(value) {
      if (!value) this.calculateActualKmWidth();
    },
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
      } else {
        this.min = false;
        this.max = false;
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
  margin-bottom: 5px;
  font-family: var(--subtitle-font-family);
}

.line {
  width: 100%;
  height: 3px;
  background-color: lightgray;
  border-radius: 5px;
}

.journey-line {
  height: 3px;
  background-color: var(--secondary-text-color);
  transition: width 1.8s ease 0.5s;
}

.km {
  position: absolute;
  text-align: right;
  font-size: large;
  left: 0;
}

.min,
.max,
.km {
  color: var(--secondary-text-color);
  font-weight: bold;
}
</style>