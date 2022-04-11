<template>
  <div class="kilometers-line">
    <div class="header">
      <transition name="transition-departure">
        <div v-if="!loading" class="place" :title="album.place_departure">
          <span>
            {{ album.place_departure }}
          </span>
        </div>
      </transition>

      <div class="hiker-wrapper" v-tooltip="'Ça use, ça use !'">
        <transition name="fade">
          <img
            v-show="hiker_is_load"
            src="@/assets/hiker.gif"
            alt="Pélerin animé"
            class="hiker"
            @load="hiker_is_load = true"
          />
        </transition>
      </div>

      <transition name="transition-arrival">
        <div v-if="!loading" class="place" :title="album.place_arrival">
          <span>
            {{ album.place_arrival }}
          </span>
        </div>
      </transition>
    </div>
    <div class="line"></div>

    <transition name="transition-km">
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
    return {
      hiker_is_load: false,
    };
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
.header {
  height: 45px;
  align-items: flex-end;
}
.footer {
  align-items: center;
}
.header,
.footer {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 5px;
  font-family: var(--subtitle-font-family);
}
.hiker-wrapper {
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 90px;
}
.hiker {
  position: absolute;
  bottom: -10px;
  width: 100px;
  filter: grayscale(60%);
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

/* Transitions */
.transition-km-enter-active,
.transition-departure-enter-active,
.transition-arrival-enter-active {
  transition: all 1s ease;
}
.transition-km-enter-from {
  opacity: 0;
  transform: translateY(50px);
}
.transition-departure-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}
.transition-arrival-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
</style>