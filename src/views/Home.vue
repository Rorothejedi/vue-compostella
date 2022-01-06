<template>
  <div class="home">
    <!-- <button @click="buttonHandler">Show : {{ show }}</button> -->
    <!-- <br /><br /> -->

    <div class="container">
      <h1 class="title">Compostella's way</h1>

      <hr />
      <br />

      <div class="wrapper">
        <transition-group
          name="staggered-fade"
          @before-enter="beforeEnter"
          @enter="enter"
        >
          <router-link
            :to="`/album/${album.id}`"
            class="box list-item"
            v-for="(album, key) in albums"
            :key="album.id"
            :data-index="key"
            style="text-decoration: none; color: inherit"
          >
            <div
              class="image"
              v-if="album.images.length > 0"
              :style="`background-image: url(${host}/${album.images[0].path})`"
            ></div>
            <div class="text" v-if="album.images.length > 0">
              <div class="places">
                <div class="departure">{{ album.departure_place }}</div>
                <div class="arrival">→ {{ album.arrival_place }}</div>
                <div class="date">
                  publié le
                  {{ moment(album.created_at).lang("fr").format("LL") }}
                </div>
              </div>
              <div class="km-wrapper">
                <span class="util"
                  >{{ album.km }} <span class="km-unit">KM</span></span
                >
                <span class="km-main"
                  >{{ album.km }} <span class="km-unit">KM</span></span
                >
                <span class="km-secondary"
                  >{{ album.km }} <span class="km-unit">KM</span></span
                >
              </div>
            </div>
            <div class="mask"></div>
          </router-link>
        </transition-group>
      </div>

      <!-- <div class="wrapper">
        <div class="box" key="0"></div>
        <div class="box" key="1"></div>
        <div class="box" key="2"></div>
        <div class="box" key="3"></div>
        <div class="box" key="4"></div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import gsap from "gsap";
import moment from "moment";

export default {
  name: "Home",

  data() {
    return {
      show: true,
      loading: false,
      host: "",
    };
  },

  computed: {
    ...mapState("album", ["albums"]),
  },

  created: function () {
    this.moment = moment;
  },

  mounted() {
    this.load();
    this.host = process.env.VUE_APP_BASE_URL;
  },

  methods: {
    ...mapActions("album", ["loadAlbums", "clearAlbums"]),

    // fetch methods

    clear() {
      this.clearAlbums();
    },
    load() {
      this.loading = true;
      this.loadAlbums().then(() => {
        this.loading = false;
      });
    },

    // button

    buttonHandler() {
      if (this.show) this.clear();
      else this.load();
      this.show = !this.show;
    },

    // transition

    beforeEnter(el) {
      el.style.opacity = 0;
    },

    enter(el, done) {
      gsap.to(el, {
        opacity: 1,
        delay: el.dataset.index * 0.15,
        onComplete: done,
      });
    },

    leave(el, done) {
      gsap.to(el, {
        opacity: 0,
        delay: el.dataset.index * 0.15,
        onComplete: done,
      });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Londrina+Outline&family=Londrina+Shadow&family=Londrina+Solid&display=swap");

.title {
  text-align: left;
}
.image {
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

.box:hover .image {
  transition: all 0.3s ease-in-out;
  opacity: 0.9;
  transform: scale(1.05);
}

/** text */

.text {
  margin-top: -60px;
  position: relative;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  z-index: 2;
}

.departure,
.arrival {
  text-overflow: ellipsis;
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

/* places */

.places {
  width: 230px;
  text-align: left;
  font-family: "Londrina Solid", cursive;
  font-size: 22px;
  margin-left: 20px;
  transition: transform 0.3s ease-in-out;
}

.box:hover .places {
  transform: translateY(-20px);
  transition: transform 0.3s ease-in-out;
}

/** date */

.date {
  font-size: 15px;
  font-style: italic;
  position: absolute;
  width: 100%;
  opacity: 0;
  transition-delay: 0.3s;
  transform: translateX(-10px);
}

.box:hover .date {
  transform: translateX(0px);
  opacity: 1;
  transition: all 0.3s ease-in-out 0.3s;
}

/* kilometers */

.km-wrapper {
  font-family: "Londrina Shadow", cursive;
  font-size: 70px;
  margin-bottom: -25px;
  transition: all 0.3s ease-in-out;
  position: relative;
}
.km-unit {
  margin-left: -10px;
  font-size: 50px;
}
.box:hover .km-wrapper {
  transition: all 0.3s ease-out;
  font-family: "Londrina Solid", cursive;
  color: white;
}

.util {
  opacity: 0;
}
.km-main {
  font-family: "Londrina Outline", cursive;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 1;
  transition: opacity 0.3s ease-in;
}
.km-secondary {
  font-family: "Londrina Solid", cursive;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s ease-in;
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

<style>
/** for test */

html {
  background-color: white;
}

/** end test */

.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 380px;
  grid-gap: 15px;
}
.box {
  background-color: black;
  align-content: center;
  overflow: hidden;

  /** a voir */
  min-width: 430px;
}

@media (max-width: 767px) {
  .wrapper {
    grid-template-columns: repeat(1, 1fr);
  }
}
@media (min-width: 768px) and (max-width: 1199px) {
  .wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
