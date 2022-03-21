<template>
  <span>
    <img
      :src="
        image ? `${host}/${image}` : 'https://picsum.photos/100?grayscale&blur'
      "
      alt=""
      @load="$emit('img-load')"
      rel="preload"
    />

    <div class="text">
      <div class="places">
        <div class="departure" :title="departure">{{ departure }}</div>
        <div class="arrival" :title="arrival">
          <arrow-right-bottom-icon :size="15" /> {{ arrival }}
        </div>
        <div class="date mobile-hidden">
          le
          {{ formatDate(date) }}
        </div>
      </div>
      <div class="km-wrapper mobile-hidden" title="Kilomètres totaux parcourus">
        <span class="util">{{ km }} <span class="km-unit">KM</span></span>
        <span class="km-main">{{ km }} <span class="km-unit">KM</span></span>
        <span class="km-secondary">
          {{ km }}
          <span class="km-unit">KM</span>
        </span>
      </div>
    </div>
    <div class="mask mobile-hidden"></div>
  </span>
</template>

<script>
import date from "@/mixins/date.js";
import ArrowRightBottomIcon from "vue-material-design-icons/ArrowRightBottom.vue";
import { mapGetters } from "vuex";

export default {
  name: "Cover",
  mixins: [date],
  components: { ArrowRightBottomIcon },

  props: {
    image: {
      type: String,
      required: false,
    },
    departure: {
      type: String,
      required: true,
    },
    arrival: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    km: {
      type: Number,
      required: true,
    },
  },

  computed: {
    ...mapGetters(["host"]),
  },

  beforeUnmount() {
    this.$emit("img-unload");
  },
};
</script>

<style scoped>
img {
  width: 100%;
  height: auto;
  min-width: 205px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  transition: opacity 0.3s ease, transform 0.3s ease;
  border-radius: 0px;
}

@media screen and (max-width: 576px) {
  img {
    border-radius: 4px;
  }
}

@media (min-width: 991px) {
  .box:hover img {
    transition: opacity 0.3s ease, transform 0.3s ease;
    opacity: 0.8;
    transform: scale(1.05);
  }
}

/* text */

.text {
  margin-top: -55px;
  position: relative;
  color: white;
  display: flex;
  justify-content: space-between;
  z-index: 2;
}

.departure,
.arrival {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* places */

.places {
  width: 195px;
  text-align: left;
  font-family: var(--title-font-family-solid);
  font-size: 20px;
  margin-left: 15px;
  transition: transform 0.3s ease-in-out;
}

@media (min-width: 991px) {
  .box:hover .places {
    transform: translateY(-24px);
    transition: transform 0.3s ease-in-out;
  }
}

/* mask */

.mask {
  width: 100%;
  z-index: 1;

  height: 200px;
  margin-top: -160px;
  background-color: rgb(44, 44, 44);
  transition: all 0.3s ease;

  mask-image: linear-gradient(transparent, black 100%);
  transform: translateY(150px);
}

.box:hover .mask {
  transform: translateY(0px);
  transition: all 0.3s ease;
}

/* date */

.date {
  margin-top: 7px;
  font-size: 15px;
  font-style: italic;
  position: absolute;
  width: 100%;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.2s ease 5s;
}

.box:hover .date {
  transform: translateX(0px);
  opacity: 1;
  transition: all 0.2s ease 0.3s;
}

/* kilometers */

.km-wrapper {
  font-family: "Londrina Outline", cursive;
  font-size: 60px;
  /* margin-bottom: -15px; */
  position: relative;
}
.km-unit {
  margin-left: -12px;
  font-size: 35px;
}

.util {
  opacity: 0;
}
.km-main,
.km-secondary {
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.3s ease;
}
.km-main {
  font-family: "Londrina Outline", cursive;
  opacity: 1;
}
.km-secondary {
  font-family: "Londrina Solid", cursive;
  opacity: 0;
}
.box:hover .km-main {
  opacity: 0;
  transition: opacity 0.3s ease-in;
}
.box:hover .km-secondary {
  opacity: 1;
  transition: opacity 0.3s ease-in;
}

/* Responsive */
.mobile-hidden {
  display: block;
}

@media (max-width: 576px) {
  .mobile-hidden {
    display: none;
  }
  .places {
    font-size: 20px !important;
    width: 200px !important;
  }
}
@media (max-width: 767px) {
  .km-wrapper {
    font-size: 45px;
    margin-top: 10px;
  }
  .km-unit {
    font-size: 30px;
    margin-left: -8px;
  }
  .places {
    width: 135px;
    font-size: 18px;
  }
  .text {
    margin-top: -50px;
  }
}
@media (min-width: 1200px) and (max-width: 1600px) {
  .km-wrapper {
    font-size: 45px;
    margin-top: 10px;
  }
  .km-unit {
    font-size: 30px;
    margin-left: -8px;
  }
  .places {
    width: 180px;
    font-size: 19px;
  }
  .text {
    margin-top: -50px;
  }
}
</style>