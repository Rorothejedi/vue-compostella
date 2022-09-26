<template>
  <transition name="transition-path-line">
    <div
      id="line"
      :style="`height: ${line_height}px`"
      v-show="!loading && albums_simple.length > 1"
    >
      <router-link
        v-for="(km, index) in albums_simple"
        :key="km.km_total"
        :to="{ name: 'album', params: { id: km.id } }"
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
        <div class="pl-point"></div>
        <div class="pl-text">{{ Math.round(km.km_total) }} km</div>
      </router-link>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapState } from "vuex";
import utils from "@/mixins/utils.js";
import MapMarkerOutlineIcon from "vue-material-design-icons/MapMarkerOutline.vue";
import MapMarkerCheckIcon from "vue-material-design-icons/MapMarkerCheck.vue";

export default {
  name: "PathLine",
  mixins: [utils],
  components: {
    MapMarkerOutlineIcon,
    MapMarkerCheckIcon,
  },

  data() {
    return {
      loading: false,
      line_height: 0,
      window_width: window.innerWidth,
    };
  },

  computed: {
    ...mapState("album", ["albums_simple"]),

    resp() {
      return this.window_width < 992;
    },
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

      this.line_height = window.innerHeight - 80;

      const points = document.getElementsByClassName("pl-point");
      const texts = document.getElementsByClassName("pl-text");

      const max = this.albums_simple[this.albums_simple.length - 1].km_total;
      const divider = this.resp ? 5 : 4;

      [...points].forEach((element, i) => {
        if (this.albums_simple[i] === undefined) return;
        let margin =
          (this.line_height / max) * this.albums_simple[i].km_total + "px";

        element.style.top = margin;
        texts[i].style.marginTop = margin;

        /* A partir de 35 points, seulement 1 point sur 3 est affiché directement */
        if (
          i !== 0 &&
          i !== points.length - 1 &&
          i % divider !== 0 &&
          points.length > 35
        ) {
          points[i].classList.add("opacify-points");
          texts[i].style.opacity = 0;
        }
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
  border-left: 1px dashed var(--third-text-color);
}
.pl-point {
  z-index: 1;
  position: absolute;
  left: -5px;
  width: 7px;
  height: 7px;
  border: 2px solid var(--main-bg-color);
  border-radius: 50%;
  background-color: var(--secondary-text-color);
  transition: all 0.3s ease, border-color 0.3s ease-in;
}
.pl-point:hover,
.point-wrapper:hover .pl-point {
  z-index: 2;
  display: flex;
  align-items: center;
  left: -13px;
  margin-top: -5px;
  padding: 8px;
  background-color: var(--main-bg-color);
  border: 2px solid var(--secondary-text-color);
  transition: all 0.3s ease;
  opacity: 1 !important;
}
.opacify-points {
  opacity: 0.4;
  width: 5px;
  height: 5px;
  left: -4px;
}
.opacify-points:hover {
  left: -12px !important;
}

.point-wrapper:hover .departure-icon,
.point-wrapper:hover .arrival-icon {
  left: -11px;
  transition: left 0.3s;
}

.point-wrapper:hover .pl-text {
  padding-left: 21px;
  opacity: 1 !important;
  transition: padding-left 0.3s ease, opacity 0.3s ease;
}

.pl-text {
  color: var(--main-text-color);
  width: max-content;
  padding-left: 13px;
  position: absolute;
  font-size: 0.8rem;
  text-align: left;
  transition: padding-left 0.3s ease, opacity 0.3s ease;
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