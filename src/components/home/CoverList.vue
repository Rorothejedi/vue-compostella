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
          v-if="album.images.length > 0"
          :image="album.images[0].cover_path"
          :departure="album.place_departure"
          :arrival="album.place_arrival"
          :date="album.date"
          :km="album.km_total"
        />
      </router-link>
    </transition-group>
  </div>
  <div class="see-more">
    <div class="loading">
      <transition name="fade-loader">
        <sync-icon
          class="loading-icon"
          v-if="loading && !first_view"
          :size="35"
        />
      </transition>
    </div>

    <div v-if="!loading" class="see-more-spacer"></div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import gsap from "gsap";
import Cover from "@/components/home/Cover.vue";
import SyncIcon from "vue-material-design-icons/Sync.vue";
import store from "../../store";

export default {
  name: "CoverList",
  components: { Cover, SyncIcon },

  data() {
    return {
      loading: false,
      page: 1,
    };
  },

  computed: {
    ...mapState("album", [
      "albums_infinite",
      "albums_infinite_meta",
      "albums_infinite_sort",
    ]),
    ...mapState("nav", ["first_view"]),
  },

  beforeMount() {
    if (this.albums_infinite.length === 0) this.fetchAlbums();
  },

  mounted() {
    this.getNextAlbums();
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

    // enter and leave box transition

    beforeEnter(el) {
      el.style.opacity = 0;
    },

    enter(el, done) {
      let calc_delay =
        parseInt(el.dataset.indexAsc) - (this.albums_infinite_meta.from - 1);

      gsap.to(el, {
        opacity: 1,
        delay: calc_delay * 0.15,
        onComplete: done,
      });
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

  height: 370px;
}

/*wrapper */
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
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

.see-more {
  display: flex;
  justify-content: center;
  padding-top: 100px;
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
</style>

