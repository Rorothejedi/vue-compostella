<template>
  <div class="kilometers-line">
    <div class="header">
      <div class="place" :title="album.place_departure">
        <transition name="fade">
          <span v-if="!loading">{{ album.place_departure }}</span>
        </transition>
      </div>

      <div class="hiker-wrapper" title="Ça use, ça use !">
        <img src="@/assets/hiker.gif" alt="Pélerin animé" class="hiker" />
      </div>

      <div class="place" :title="album.place_arrival">
        <transition name="fade">
          <span v-if="!loading">
            {{ album.place_arrival }}
          </span>
        </transition>
      </div>
    </div>
    <div class="line"></div>

    <transition name="fade">
      <div class="footer" v-if="!loading">
        <div
          class="footer-km"
          v-tooltip.bottom="'Kilomètres parcourus au départ de l\'étape'"
        >
          <map-marker-outline-icon />
          {{ Math.round(start_km) }}
          <small>km</small>
        </div>
        <div>
          <small>
            Étape de <span class="bold">{{ album.km_step }}km</span>
          </small>
        </div>
        <div
          class="footer-km"
          v-tooltip.bottom="'Kilomètres parcourus à la fin de l\'étape'"
        >
          {{ Math.round(album.km_total) }}
          <small>km</small>
          <map-marker-check-icon />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import MapMarkerOutlineIcon from "vue-material-design-icons/MapMarkerOutline.vue";
import MapMarkerCheckIcon from "vue-material-design-icons/MapMarkerCheck.vue";

export default {
  name: "KilometersLine",
  components: { MapMarkerOutlineIcon, MapMarkerCheckIcon },
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
  padding-top: 75px;
  padding-bottom: 60px;
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
  width: 100%;
}
.hiker {
  position: absolute;
  bottom: -10px;
  width: 100px;
  filter: grayscale(70%);
}
.place {
  font-family: var(--title-font-family-solid);
  font-size: 1.7rem;
  width: 100%;
  min-height: 31px;
  height: auto;
  text-overflow: ellipsis;
  overflow: hidden;
}
.place:last-child {
  text-align: right;
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
.footer-km {
  display: flex;
  align-items: center;
}
</style>