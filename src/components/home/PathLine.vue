<template>
  <div id="line">
    <router-link
      v-for="(km, i) in albums_simple"
      :key="km.km_total"
      :to="`/album/${km.id}`"
      class="point-wrapper"
    >
      <map-marker-outline-icon
        class="departure-icon"
        fillColor="#aaa"
        v-if="i === 0"
      />
      <map-marker-check-icon
        class="arrival-icon"
        fillColor="#aaa"
        :style="`margin-top: ${line_height}px`"
        v-if="i === albums_simple.length - 1"
      />
      <div class="point"></div>
      <div class="text">{{ km.km_total }} km</div>
    </router-link>
  </div>
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
      line_height: 0,
      loading: false,
      // all_kms: [
      //   {
      //     id: 25,
      //     km_total: 0,
      //   },
      //   {
      //     id: 25,
      //     km_total: 24,
      //   },
      //   {
      //     id: 25,
      //     km_total: 44,
      //   },
      //   {
      //     id: 25,
      //     km_total: 63,
      //   },
      //   {
      //     id: 25,
      //     km_total: 91,
      //   },
      //   {
      //     id: 25,
      //     km_total: 117,
      //   },
      //   {
      //     id: 25,
      //     km_total: 133,
      //   },
      //   {
      //     id: 25,
      //     km_total: 155,
      //   },
      //   {
      //     id: 25,
      //     km_total: 168,
      //   },
      //   {
      //     id: 25,
      //     km_total: 182,
      //   },
      //   {
      //     id: 25,
      //     km_total: 203,
      //   },
      //   {
      //     id: 25,
      //     km_total: 227,
      //   },
      //   {
      //     id: 25,
      //     km_total: 251,
      //   },
      //   {
      //     id: 25,
      //     km_total: 282,
      //   },
      //   {
      //     id: 25,
      //     km_total: 300,
      //   },
      //   {
      //     id: 25,
      //     km_total: 328,
      //   },
      //   {
      //     id: 25,
      //     km_total: 347,
      //   },
      //   {
      //     id: 25,
      //     km_total: 361,
      //   },
      //   {
      //     id: 25,
      //     km_total: 393,
      //   },
      //   {
      //     id: 25,
      //     km_total: 408,
      //   },
      //   {
      //     km_total: 435,
      //   },
      //   {
      //     id: 25,
      //     km_total: 454,
      //   },
      //   {
      //     id: 25,
      //     km_total: 476,
      //   },
      //   {
      //     id: 25,
      //     km_total: 487,
      //   },
      //   {
      //     id: 25,
      //     km_total: 519,
      //   },
      //   {
      //     id: 25,
      //     km_total: 552,
      //   },
      //   {
      //     id: 25,
      //     km_total: 573,
      //   },
      //   {
      //     id: 25,
      //     km_total: 601,
      //   },
      //   {
      //     id: 25,
      //     km_total: 635,
      //   },
      //   {
      //     id: 25,
      //     km_total: 665,
      //   },
      //   {
      //     id: 25,
      //     km_total: 696,
      //   },
      //   {
      //     id: 25,
      //     km_total: 716,
      //   },
      //   {
      //     id: 25,
      //     km_total: 738,
      //   },
      //   {
      //     id: 25,
      //     km_total: 761,
      //   },
      //   // {
      //   //   id: 25,
      //   //   km_total: 780,
      //   // },
      //   // {
      //   //   id: 25,
      //   //   km_total: 805,
      //   // },
      //   // {
      //   //   id: 25,
      //   //   km_total: 1525,
      //   // },
      // ],
    };
  },

  computed: {
    ...mapState("album", ["albums_simple"]),
  },

  mounted() {
    this.fetchAlbumsSimple();
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.initLine);
  },

  methods: {
    ...mapActions("album", ["loadAlbumsSimple"]),

    initLine() {
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
    },

    fetchAlbumsSimple() {
      this.loading = true;

      this.loadAlbumsSimple().then(() => {
        this.initLine();
        window.addEventListener("resize", this.initLine);

        this.loading = false;
      });
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
  transition: all 0.3s;
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
</style>