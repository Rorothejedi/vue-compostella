<template>
  <div>
    <p>Ajout de vidéo YouTube</p>
    <form>
      <label for="title">Titre : </label>
      <input
        v-model="title"
        placeholder="Titre"
        id="title"
        type="text"
        :disabled="loading"
        required
      />

      <br /><br />

      <label for="link">Mettre le lien : </label>
      <input
        v-model="link"
        placeholder="Lien"
        id="link"
        type="text"
        :disabled="loading"
        required
      />
      <br />
      <small>
        Mettre le lien YouTube complet. Ex: https://youtu.be/qCd5eVtQhJE
      </small>

      <br /><br />

      <button type="button" :disabled="loading" @click="addVideo()">
        Créer <span v-if="loading_create">loading...</span>
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "VideoNew",

  props: {
    loading: {
      type: Boolean,
      default: false,
      required: true,
    },
  },

  data() {
    return {
      title: "",
      link: "",
      loading_create: false,
    };
  },

  computed: {
    ...mapState("album", ["album"]),
  },

  methods: {
    ...mapActions("video", ["createVideo"]),
    ...mapActions("album", ["loadAlbum"]),

    addVideo() {
      this.loading_create = true;

      let params = {};

      params.link = this.link;
      params.album_id = this.album.id;
      if (this.title !== "") params.title = this.title;

      this.createVideo(params).then(() => {
        this.loadAlbum(this.album.id).then(() => {
          this.title = "";
          this.link = "";
          this.loading_create = false;
        });
      });
    },
  },
};
</script>