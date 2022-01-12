<template>
  <span>
    <img :src="`${host}/${image}`" alt="" />

    <div class="text">
      <div class="places">
        <div class="departure">{{ departure }}</div>
        <div class="arrival">→ {{ arrival }}</div>
        <div class="date">
          publié le
          {{ formatted_date }}
        </div>
      </div>
      <div class="km-wrapper">
        <span class="util">{{ km }} <span class="km-unit">KM</span></span>
        <span class="km-main">{{ km }} <span class="km-unit">KM</span></span>
        <span class="km-secondary"
          >{{ km }} <span class="km-unit">KM</span></span
        >
      </div>
    </div>
    <div class="mask"></div>
  </span>
</template>

<script>
import moment from "moment";

export default {
  name: "Cover",
  props: {
    image: {
      type: String,
      required: true,
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

  data() {
    return {
      host: "",
    };
  },

  computed: {
    formatted_date() {
      return this.moment(this.date).locale("fr").format("LL");
    },
  },

  mounted() {
    this.host = process.env.VUE_APP_BASE_URL;
  },

  created() {
    this.moment = moment;
  },
};
</script>

<style scoped>
img {
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;
  height: -webkit-fill-available;
  transition: all 0.3s ease-in-out;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.box:hover img {
  transition: all 0.3s ease-in-out;
  opacity: 0.9;
  transform: scale(1.05);
}

/** text */

.text {
  margin-top: -55px;
  position: relative;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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
  width: 200px;
  text-align: left;
  font-family: "Londrina Solid", cursive;
  font-size: 20px;
  margin-left: 20px;
  transition: transform 0.3s ease-in-out;
}

.box:hover .places {
  transform: translateY(-20px);
  transition: transform 0.3s ease-in-out;
}

/** mask */

.mask {
  width: 100%;
  z-index: 1;

  height: 200px;
  margin-top: -160px;
  background-color: rgb(44, 44, 44);
  transition: all 0.3s ease-in-out;

  mask-image: linear-gradient(transparent, black 100%);
  transform: translateY(150px);
}

.box:hover .mask {
  transform: translateY(0px);
  transition: all 0.3s ease-in-out;
}

/** date */

.date {
  margin-top: 5px;
  font-size: 15px;
  font-style: italic;
  position: absolute;
  width: 100%;
  opacity: 0;
  transition-delay: 0.3s;
  transform: translateX(-10px);
  transition: all 0.3s ease-in-out 0.3s;
}

.box:hover .date {
  transform: translateX(0px);
  opacity: 1;
  transition: all 0.3s ease-in-out 0.3s;
}

/* kilometers */

.km-wrapper {
  font-family: "Londrina Shadow", cursive;
  font-size: 60px;
  margin-bottom: -20px;
  transition: all 0.3s ease;
  position: relative;
}
.km-unit {
  margin-left: -10px;
  font-size: 40px;
}
.box:hover .km-wrapper {
  transition: all 0.3s ease;
  font-family: "Londrina Solid", cursive;
  color: white;
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
</style>