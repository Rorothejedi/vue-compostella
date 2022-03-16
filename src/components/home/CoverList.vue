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
        :data-index-desc="albums_infinite.length - key - 1"
        class="box"
      >
        <Cover
          :image="album.images.length > 0 ? album.images[0].cover_path : ''"
          :departure="album.place_departure"
          :arrival="album.place_arrival"
          :date="album.date"
          :km="album.km_total"
          @img-load="img_load++"
          @img-unload="img_load--"
        />
      </router-link>
    </transition-group>
  </div>
  <div
    :class="
      albums_infinite.length === 0 ? 'see-more-wrapper' : 'see-more-wrapper-bis'
    "
  >
    <div class="see-more">
      <transition
        :name="albums_infinite.length === 0 ? 'fade-loader' : 'fade-loader-bis'"
      >
        <div class="loading" v-if="!isImagesLoaded && test">
          <sync-icon class="loading-icon" :size="35" />
        </div>
      </transition>

      <div v-if="isImagesLoaded" class="see-more-spacer"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import store from "../../store";
import gsap from "gsap";
import utils from "@/mixins/utils.js";
import Cover from "@/components/home/Cover.vue";
import SyncIcon from "vue-material-design-icons/Sync.vue";

export default {
  name: "CoverList",
  mixins: [utils],
  components: { Cover, SyncIcon },

  data() {
    return {
      loading: false,
      page: 1,
      el_by_row: 3,

      img_load: 0,
      test: false,
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
  },

  beforeMount() {
    if (this.albums_infinite.length === 0) this.fetchAlbums();
  },

  mounted() {
    this.getNextAlbums();
    this.test = true;
  },

  methods: {
    ...mapActions("album", ["loadAlbumsInfinite"]),

    fetchAlbums() {
      if (this.loading) return;

      this.loading = true;

      const params = {
        hide: 0,
        page: this.page,
        sort_by: this.albums_infinite_sort,
      };

      this.loadAlbumsInfinite(params).then(() => {
        this.loading = false;
      });
    },

    /* Infinite scroll */

    getNextAlbums() {
      window.onscroll = () => {
        const window_bottom =
          document.documentElement.scrollTop + window.innerHeight >=
          document.documentElement.offsetHeight - 500;

        if (
          !window_bottom ||
          this.loading ||
          this.albums_infinite_meta.current_page ===
            this.albums_infinite_meta.last_page
        )
          return;

        if (this.first_view) store.commit("nav/FIRST_VIEW_SEEN");

        this.page++;
        this.fetchAlbums();
      };
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
          delay: calc_delay * 0.15,
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
.box {
  text-decoration: none;
  color: inherit;
  background-color: black;
  align-content: center;
  overflow: hidden;

  height: 374px;
}

@media (max-width: 767px) {
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

/*wrapper */
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 9px;
}
@media (max-width: 1199px) {
  .wrapper {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }
}

/* See more */

.see-more-wrapper,
.see-more-wrapper-bis {
  display: flex;
  justify-content: center;
  align-items: center;
}
.see-more-wrapper {
  height: -webkit-fill-available;
}
.see-more-wrapper-bis {
  height: 250px;
}
.see-more {
  display: flex;
  justify-content: center;
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
.fade-loader-leave-active,
.fade-loader-bis-leave-active {
  transition: all 0.3s ease-out;
}

.fade-loader-enter-active {
  transition-delay: 3s;
}
.fade-loader-bis-enter-active {
  transition-delay: 0.5s;
}
</style>

