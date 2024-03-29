<template>
  <div class="wrapper">
    <transition-group
      name="staggered-fade"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <router-link
        v-for="(album, key) in albums_infinite"
        :key="album.id"
        :to="`/album/${album.id}`"
        :data-index-asc="key"
        :data-index-desc="11 - key"
        class="box"
      >
        <div class="resp-point"></div>
        <div class="resp-text">
          <div class="km">{{ Math.round(album.km_total) }} km</div>
          <div class="date">le {{ formatDate(album.date) }}</div>
        </div>
        <Cover
          :image="album.images.length > 0 ? album.images[0].cover_path : ''"
          :departure="album.place_departure"
          :arrival="album.place_arrival"
          :date="album.date"
          :km="album.km_total"
          @img-load="img_load++"
          @img-unload="img_load--"
          @click="$emit('saveTop')"
          class="cover"
        />
      </router-link>
    </transition-group>
  </div>
  <div
    :class="
      albums_infinite.length === 0
        ? 'see-more-wrapper-start'
        : !isEndOfInfinite
        ? 'see-more-wrapper'
        : 'see-more-wrapper-end'
    "
  >
    <div class="see-more">
      <transition
        :name="albums_infinite.length === 0 ? 'fade-loader' : 'fade-loader-bis'"
      >
        <div
          :class="{
            loading:
              loading && (!isEndOfInfinite || albums_infinite.length === 0),
          }"
          v-if="loading && is_mounted"
        >
          <sync-icon class="loading-icon" :size="35" />
        </div>
      </transition>

      <div v-if="loading" class="see-more-spacer"></div>
    </div>

    <!-- <transition name="fade">
      <div v-if="!loading && albums_infinite.length === 0" class="empty-home">
        <p>
          Vous êtes un peu en avance, je n'ai rien à vous montrer pour le moment
          !
          <br /><br />
          Revenez plus tard !
        </p>
      </div>
    </transition> -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import gsap from "gsap";
import utils from "@/mixins/utils.js";
import date from "@/mixins/date.js";
import Cover from "@/components/home/Cover.vue";
import SyncIcon from "vue-material-design-icons/Sync.vue";

export default {
  name: "CoverList",
  mixins: [utils, date],
  components: { Cover, SyncIcon },
  emits: ["saveTop"],

  data() {
    return {
      loading: false,
      page: 1,
      img_load: 0,
      is_mounted: false,
    };
  },

  computed: {
    ...mapState("album", [
      "albums_infinite",
      "albums_infinite_meta",
      "albums_infinite_sort",
    ]),
    ...mapState("nav", ["first_view"]),

    isImagesLoaded() {
      return (
        this.albums_infinite.length === this.img_load &&
        this.img_load !== 0 &&
        !this.loading
      );
    },

    isEndOfInfinite() {
      return this.albums_infinite_meta.to === this.albums_infinite_meta.total;
    },
  },

  beforeMount() {
    if (this.albums_infinite.length === 0) this.fetchAlbums();
  },

  mounted() {
    window.addEventListener("scroll", this.getNextAlbums);
    this.is_mounted = true;
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.getNextAlbums);
  },

  methods: {
    ...mapActions("album", ["loadAlbumsInfinite"]),
    ...mapActions("nav", ["firstViewSeen"]),

    async fetchAlbums() {
      if (this.loading) return;

      this.loading = true;

      const params = {
        hide: 0,
        page: this.page,
        sort_by: this.albums_infinite_sort,
      };

      await this.loadAlbumsInfinite(params);

      this.loading = false;
    },

    /* Infinite scroll */

    getNextAlbums() {
      const total_page_height = document.body.scrollHeight - 300;
      const scroll_point = window.scrollY + window.innerHeight;
      const window_bottom = scroll_point >= total_page_height;

      if (
        !window_bottom ||
        this.loading ||
        this.albums_infinite_meta.current_page ===
          this.albums_infinite_meta.last_page
      )
        return;

      if (this.first_view) this.firstViewSeen();

      this.page++;
      this.fetchAlbums();
    },

    /* Enter and leave box transition */

    beforeEnter(el) {
      el.style.opacity = 0;
    },

    async enter(el, done) {
      if (!this.isImagesLoaded) {
        await this.sleep(200);

        this.enter(el, done);
      } else {
        let calc_delay =
          parseInt(el.dataset.indexAsc) - (this.albums_infinite_meta.from - 1);

        gsap.to(el, {
          opacity: 1,
          delay: calc_delay * 0.12,
          onComplete: done,
        });
      }
    },

    leave(el, done) {
      gsap.to(el, {
        opacity: 0,
        delay:
          parseInt(el.dataset.indexAsc) < 12 ? el.dataset.indexDesc * 0.08 : 0,
        onComplete: done,
      });
    },
  },
};
</script>

<style scoped>
.empty-home {
  text-align: center;
  font-family: var(--subtitle-font-family);
}
.box {
  text-decoration: none;
  color: inherit;
  background-color: black;
  align-content: center;
  overflow: hidden;
  height: 374px;
}

.resp-text,
.resp-point {
  display: none;
}

@media screen and (max-width: 576px) {
  .box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    padding-left: 10px;
    color: var(--main-text-color);
    position: relative;
    background-color: var(--main-bg-color);
    height: auto;
    overflow: initial;
    margin-left: 2vw;
  }
  .box:last-child::before,
  .box:first-child::before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    height: 50%;
    border-left: 1px dashed grey;
  }
  .box:first-child::before {
    bottom: 0;
  }
  .box:last-child::before {
    top: 0;
  }

  .box:not(.box:first-child):not(.box:last-child) {
    border-left: 1px dashed grey;
  }
  .cover {
    width: 220px;
  }
  .resp-text {
    display: block;
  }
  .resp-point {
    display: block;
    position: absolute;
    margin-top: 5px;
    left: -7px;
    width: 10px;
    height: 10px;
    background-color: var(--secondary-text-color);
    border-radius: 50%;
    border: 2px solid var(--main-bg-color);
  }
  .km {
    font-family: var(--title-font-family-solid);
    font-size: 25px;
  }
  .date {
    font-size: 0.75rem;
    font-style: oblique;
  }
  .see-more-wrapper-end {
    height: 0px !important;
  }
}

@media (min-width: 577px) and (max-width: 767px) {
  .box {
    height: 265px;
  }
}
@media (min-width: 768px) and (max-width: 1199px) {
  .box {
    height: 355px;
  }
}
@media (min-width: 1200px) and (max-width: 1600px) {
  .box {
    height: 314px;
  }
}

/* Wrapper */
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 9px;
}
@media (max-width: 576px) {
  .wrapper {
    grid-template-columns: none;
    grid-gap: 0px;
  }
}
@media (min-width: 577px) and (max-width: 1199px) {
  .wrapper {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }
}

/* See more */

.see-more-wrapper-start,
.see-more-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.see-more-wrapper-start {
  height: -webkit-fill-available;
}
.see-more-wrapper {
  height: 250px;
}
.see-more-wrapper-end {
  height: 50px;
}
.see-more-spacer {
  width: 100%;
  height: 40px;
}
.loading {
  animation: spin 2s infinite linear;
}
.loading-icon {
  display: flex;
}

/* Loader transitions */
.fade-loader-enter-from,
.fade-loader-bis-enter-from {
  opacity: 0;
}
.fade-loader-leave-to,
.fade-loader-bis-leave-to {
  opacity: 0;
}

.fade-loader-enter-active,
.fade-loader-bis-enter-active {
  transition: opacity 0.3s ease-in;
}

.fade-loader-enter-active {
  transition-delay: 4s;
}
.fade-loader-bis-enter-active {
  transition-delay: 0.5s;
}
</style>

