<template>
  <transition name="transition-path-line">
    <div id="line" v-show="!loading && albums_simple.length > 1">
      <router-link
        v-for="(km, index) in albums_simple"
        :key="km.km_total"
        :to="`/album/${km.id}`"
        class="point-wrapper"
        @click="$emit('saveTop')"
      >
        <map-marker-outline-icon
          class="departure-icon"
          fillColor="#aaa"
          v-if="index === 0"
        />
        <map-marker-check-icon
          class="arrival-icon"
          fillColor="#aaa"
          :style="`margin-top: ${line_height}px`"
          v-if="index === albums_simple.length - 1"
        />
        <div class="point"></div>
        <div class="text">{{ Math.round(km.km_total) }} km</div>
      </router-link>
    </div>
  </transition>
</template>

<script>
import MapMarkerOutlineIcon from "vue-material-design-icons/MapMarkerOutline.vue";
import MapMarkerCheckIcon from "vue-material-design-icons/MapMarkerCheck.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "PathLine",
  components: {
    MapMarkerOutlineIcon,
    MapMarkerCheckIcon,
  },

  data() {
    return {
      loading: false,
      is_mounted: false,
      line_height: 0,
    };
  },

  computed: {
    ...mapState("album", ["albums_simple"]),
  },

  mounted() {
    if (this.albums_simple.length === 0) {
      this.fetchAlbumsSimple();
    } else {
      this.initLine();
    }
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.initLine);
  },

  methods: {
    ...mapActions("album", ["loadAlbumsSimple"]),

    initLine() {
      if (this.albums_simple.length <= 0) return;

      this.line_height = document.getElementById("line").clientHeight;

      const points = document.getElementsByClassName("point");
      const texts = document.getElementsByClassName("text");

      const max = this.albums_simple[this.albums_simple.length - 1].km_total;

      [...points].forEach((element, i) => {
        let margin =
          (this.line_height / max) * this.albums_simple[i].km_total + "px";

        element.style.top = margin;
        texts[i].style.marginTop = margin;

        /* A partir de 35 points, seulement 1 point sur 4 est affiché directement */
        if (
          i !== 0 &&
          i !== points.length - 1 &&
          i % 4 !== 0 &&
          points.length > 35
        )
          texts[i].style.opacity = 0;
      });

      window.addEventListener("resize", this.initLine);
    },

    async fetchAlbumsSimple() {
      if (this.loading) return;

      this.loading = true;

      await this.loadAlbumsSimple();

      this.loading = false;

      await this.$nextTick();

      this.initLine();
    },
  },
};
</script>

<style scoped>
#line {
  height: calc(100vh - 100px);
  border-left: 1px dashed lightgray;
}

/** ------- points ----- */

.point {
  position: absolute;
  left: -5px;
  width: 7px;
  height: 7px;
  border: 2px solid white;
  border-radius: 50%;
  background-color: var(--secondary-text-color);
  transition: all 0.5s ease;
}
.point:hover,
.point-wrapper:hover .point {
  display: flex;
  align-items: center;
  left: -13px;
  margin-top: -5px;
  padding: 8px;
  background-color: white;
  border: 2px solid var(--secondary-text-color);
  transition: all 0.3s;
}

.point-wrapper:hover .departure-icon,
.point-wrapper:hover .arrival-icon {
  left: -11px;
  transition: left 0.3s;
}

.point-wrapper:hover .text {
  width: 80px;
  opacity: 1 !important;
  transition: width 0.3s ease, opacity 0.3s ease;
}

.text {
  color: var(--main-text-color);
  width: 60px;
  position: absolute;
  font-size: 0.8rem;
  text-align: center;
  transition: width 0.3s ease, opacity 0.3s ease;
}

.departure-icon,
.arrival-icon {
  position: absolute;
  left: -35px;
  top: -3px;
  width: 50px;
  z-index: 10;
  transition: left 0.3s;
}

/* Transition */
.transition-path-line-enter-active {
  transition: all 0.5s ease 1.4s;
}
.transition-path-line-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}
</style>