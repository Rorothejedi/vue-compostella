<template>
  <div class="kilometers-line">
    <div class="header">
      <div class="place">{{ album.place_departure }}</div>

      <div class="hiker-wrapper">
        <img src="@/assets/hiker.gif" alt="Pélerin animé" class="hiker" />
      </div>

      <div class="place">{{ album.place_arrival }}</div>
    </div>
    <div class="line"></div>

    <div class="footer">
      <div>{{ start_km }}<small>km</small></div>
      <div>
        <small>
          Étape de <span class="bold">{{ album.km_step }}km</span>
        </small>
      </div>
      <div>{{ album.km_total }}<small>km</small></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KilometersLine",
  props: {
    album: {
      type: Object,
      required: true,
      default: () => {},
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {};
  },

  computed: {
    start_km() {
      return this.album.km_total - this.album.km_step;
    },
  },
};
</script>

<style scoped>
.kilometers-line {
  margin-top: 70px;
  margin-bottom: 40px;
}
/* Text */
.header,
.footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
  margin-bottom: 5px;
  font-family: var(--subtitle-font-family);
}
.hiker-wrapper {
  display: flex;
  justify-content: center;
  position: relative;
  width: 100px;
  height: 20px;
}
.hiker {
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100px;
  filter: grayscale(70%);
}
.place {
  font-family: var(--title-font-family-solid);
  font-size: 1.7rem;
}

/* Line */
.line {
  height: 5px;
  width: 100%;
  opacity: 0.3;
  border-top: 4px dotted;
  animation: stream 0.5s infinite linear;
}
@keyframes stream {
  100% {
    transform: translateX(-8px);
  }
}

/* Footer text */
.footer {
}
</style>