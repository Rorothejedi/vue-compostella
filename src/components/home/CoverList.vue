<template>
  <transition-group
    name="staggered-fade"
    @before-enter="beforeEnter"
    @enter="enter"
  >
    <router-link
      :to="`/album/${album.id}`"
      class="box"
      v-for="(album, key) in albums"
      :key="album.id"
      :data-index="key"
    >
      <Cover
        v-if="album.images.length > 0"
        :image="album.images[0].path"
        :departure="album.departure_place"
        :arrival="album.arrival_place"
        :date="album.created_at"
        :km="album.km"
      />
    </router-link>
  </transition-group>
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
    };
  },

  computed: {
    ...mapState("album", ["albums"]),
  },

  mounted() {
    this.fetchAlbums();
  },

  methods: {
    ...mapActions("album", ["loadAlbums"]),

    fetchAlbums() {
      this.loading = true;
      this.loadAlbums().then(() => {
        this.loading = false;
      });
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
@import url("https://fonts.googleapis.com/css2?family=Londrina+Outline&family=Londrina+Shadow&family=Londrina+Solid&display=swap");

.box {
  text-decoration: none;
  color: inherit;
  background-color: black;
  align-content: center;
  overflow: hidden;

  height: 370px;
}
</style>

