<template>
  <div class="home">
    <!-- <button @click="buttonHandler">Show : {{ show }}</button> -->
    <!-- <br /><br /> -->

    <div class="container">
      <h1 class="title">Compostella's way</h1>

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
          >
            <div
              class="image"
              v-if="album.images.length > 0"
              :style="`background-image: url(${host}/${album.images[0].path})`"
            >
              {{ album.departure_place }} -> {{ album.arrival_place }} <br />
              KM {{ album.km }} <br />
            </div>
            <!-- <img
              class="image"
              :src="`${host}/${album.images[0].path}`"
              v-if="album.images.length > 0"
            /> -->
            <!-- {{ album.departure_place }} -> {{ album.arrival_place }} <br />
            KM {{ album.km }} <br /> -->
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
        delay: el.dataset.index * 0.05,
        onComplete: done,
      });
    },

    leave(el, done) {
      gsap.to(el, {
        opacity: 0,
        delay: el.dataset.index * 0.05,
        onComplete: done,
      });
    },
  },
};
</script>

<style scoped>
.title {
  text-align: left;
}
.image {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;
  height: -webkit-fill-available;
  transition: all 0.3s ease-in-out;
}
.image:hover {
  background-position: right top;
  transition: all 0.3s ease-in-out;
}
</style>

<style>
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 370px;
  grid-gap: 15px;
}
.box {
  background-color: rgb(34, 129, 184);
  align-content: center;
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
