<template>
  <div class="wrapper">
    <transition-group
      name="staggered-fade"
      @before-enter="beforeEnter"
      @enter="enter"
    >
      <router-link
        v-for="(album, key) in albums_infinite"
        :key="album.id"
        :to="`/album/${album.id}`"
        :data-index="key"
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
    <p
      v-if="albums_infinite_meta.current_page < albums_infinite_meta.last_page"
    >
      {{ loading ? "loading..." : "Voir plus" }}
    </p>
    <div v-else class="see-more-spacer"></div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import gsap from "gsap";
import Cover from "@/components/home/Cover.vue";

export default {
  name: "CoverList",
  components: { Cover },

  data() {
    return {
      loading: false,
      page: 1,
    };
  },

  computed: {
    ...mapState("album", ["albums_infinite", "albums_infinite_meta"]),
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
      };

      this.loadAlbumsInfinite(params).then(() => {
        this.loading = false;
      });
    },

    /* Infinite scroll */

    getNextAlbums() {
      window.onscroll = () => {
        const window_bottom =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;

        if (
          !window_bottom ||
          this.loading ||
          this.albums_infinite_meta.current_page ===
            this.albums_infinite_meta.last_page
        )
          return;

        this.page++;
        this.fetchAlbums();
      };
    },

    // enter box transition

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
  grid-gap: 15px;
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
  padding-top: 50px;
}
.see-more-spacer {
  width: 100%;
  height: 50px;
}
</style>

