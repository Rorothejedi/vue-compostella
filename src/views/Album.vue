<template>
  <div class="album">
    <div class="container">
      <br />
      <router-link to="/">Retour</router-link>
      <br />
      <br />
      <h3 v-if="loading">Loading...</h3>
      <h2>
        {{ album.id }} {{ album.departure_place }} → {{ album.arrival_place }}
      </h2>
      <br />
      <KilometersLine v-if="!loading" :km="album.km" />
      <br />
      <h4>Text</h4>
      <p>
        {{ album.text }}
      </p>
      <br />
      <br />
      <Gallery :images="album.images" />
      <hr />
      <CommentList :comments="album.comments" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CommentList from "@/components/CommentList.vue";
import Gallery from "@/components/Gallery.vue";
import KilometersLine from "@/components/KilometersLine.vue";

export default {
  name: "Album",
  components: { KilometersLine, Gallery, CommentList },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapState("album", ["album"]),
  },

  mounted() {
    this.fetchAlbum();
  },

  unmounted() {
    this.clearAlbum();
  },

  methods: {
    ...mapActions("album", ["loadAlbum", "clearAlbum"]),

    fetchAlbum() {
      this.loading = true;
      this.loadAlbum(this.$route.params.id).then(() => {
        this.loading = false;
      });
    },
  },
};
</script>
