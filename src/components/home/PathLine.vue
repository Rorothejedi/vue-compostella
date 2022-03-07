<template>
  <div class="wrapper">
    <div class="sub-wrapper">
      <div id="line">
        <router-link
          v-for="(km, index) in all_kms"
          :key="km.km_total"
          :to="`/album/${km.id}`"
          class="point-wrapper"
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
            v-if="index === all_kms.length - 1"
          />
          <div class="point"></div>
          <div class="text">{{ km.km_total }} km</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import MapMarkerOutlineIcon from "vue-material-design-icons/MapMarkerOutline.vue";
import MapMarkerCheckIcon from "vue-material-design-icons/MapMarkerCheck.vue";

export default {
  name: "PathLine",
  components: {
    MapMarkerOutlineIcon,
    MapMarkerCheckIcon,
  },

  data() {
    return {
      line_height: 0,
      all_kms: [
        {
          id: 25,
          km_total: 0,
        },
        {
          id: 25,
          km_total: 18,
        },
        {
          id: 25,
          km_total: 39,
        },
        {
          id: 25,
          km_total: 61,
        },
        {
          id: 25,
          km_total: 66,
        },
        {
          id: 25,
          km_total: 89,
        },
        {
          id: 25,
          km_total: 114,
        },
        {
          id: 25,
          km_total: 146,
        },
        // {
        //   id: 25,
        //   km_total: 181,
        // },
        // {
        //   id: 25,
        //   km_total: 205,
        // },
        // {
        //   id: 25,
        //   km_total: 232,
        // },
        // {
        //   id: 25,
        //   km_total: 239,
        // },
        // {
        //   id: 25,
        //   km_total: 279,
        // },
        // {
        //   id: 25,
        //   km_total: 339,
        // },
        // {
        //   id: 25,
        //   km_total: 370,
        // },
        // {
        //   id: 25,
        //   km_total: 412,
        // },
        // {
        //   id: 25,
        //   km_total: 475,
        // },
        // {
        //   id: 25,
        //   km_total: 539,
        // },
        // {
        //   id: 25,
        //   km_total: 600,
        // },
        // {
        //   id: 25,
        //   km_total: 658,
        // },
        // {
        //   km_total: 729,
        // },
        // {
        //   id: 25,
        //   km_total: 858,
        // },
        // {
        //   id: 25,
        //   km_total: 973,
        // },
        // {
        //   id: 25,
        //   km_total: 1003,
        // },
        // {
        //   id: 25,
        //   km_total: 1083,
        // },
        // {
        //   id: 25,
        //   km_total: 1125,
        // },
        // {
        //   id: 25,
        //   km_total: 1242,
        // },
        // {
        //   id: 25,
        //   km_total: 1292,
        // },
        // {
        //   id: 25,
        //   km_total: 1333,
        // },
        // {
        //   id: 25,
        //   km_total: 1433,
        // },
        // {
        //   id: 25,
        //   km_total: 1520,
        // },
      ],
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      let get_line_length = document.getElementById("line").clientHeight;
      this.line_height = get_line_length;

      const points = document.getElementsByClassName("point");
      const texts = document.getElementsByClassName("text");

      const max = this.all_kms[this.all_kms.length - 1].km_total;

      [...points].forEach((element, i) => {
        let margin = (get_line_length / max) * this.all_kms[i].km_total + "px";
        element.style.top = margin;

        texts[i].style.marginTop = margin;
      });
    },
  },
};
</script>

<style scoped>
.wrapper {
  position: fixed;
  top: 50px;
  left: 8vw;
}
.sub-wrapper {
  display: flex;
  justify-content: center;
  height: calc(100vh - 100px);
}

#line {
  /* width: 2px; */
  /* background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='95' ry='95' stroke='grey' stroke-width='4' stroke-dasharray='15' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e"); */
  border-left: 1px dashed lightgray;
  /* position: relative; */
}

/** ------- points ----- */

.point {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: var(--secondary-text-color);
  left: -6px;
  position: absolute;
  border: 3px solid white;
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
  border: 2px solid lightcoral;
  transition: all 0.3s;
}

.point-wrapper:hover .departure-icon,
.point-wrapper:hover .arrival-icon {
  left: -11px;
  transition: left 0.3s;
}

.point-wrapper:hover .text {
  width: 80px;
  transition: width 0.3s ease;
}

.text {
  color: var(--main-text-color);
  width: 60px;
  position: absolute;
  font-size: 0.8rem;
  text-align: center;

  transition: width 0.3s ease;
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