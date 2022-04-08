<template>
  <div>
    <h3 class="title">Ajout vidéo YouTube</h3>

    <div class="inputs-wrapper">
      <label for="title">Titre de la section : </label>
      <made-up-input
        v-model="title"
        placeholder="ex: blabla"
        id="text"
        :disabled="loading"
      />
    </div>

    <div class="inputs-wrapper">
      <label for="link">Lien YouTube complet : </label>
      <made-up-input
        v-model="link"
        placeholder="ex: https://youtu.be/qCd5eVtQhJE"
        id="link"
        :disabled="loading"
      />
    </div>

    <br />

    <made-up-button
      @click="addVideo()"
      :loading="loading_create"
      :disabled="loading || link === ''"
      small
    >
      Créer
    </made-up-button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import MadeUpInput from "@/components/utils/MadeUpInput.vue";
import MadeUpButton from "@/components/utils/MadeUpButton.vue";

export default {
  name: "VideoNew",
  components: { MadeUpInput, MadeUpButton },
  props: {
    loading: {
      type: Boolean,
      default: false,
      required: true,
    },
  },

  data() {
    return {
      loading_create: false,
      title: "",
      link: "",
    };
  },

  computed: {
    ...mapState("album", ["album"]),
  },

  methods: {
    ...mapActions("video", ["createVideo"]),
    ...mapActions("album", ["loadAlbum"]),

    async addVideo() {
      if (this.loading_create) return;

      this.loading_create = true;

      let params = {};

      params.link = this.link;
      params.album_id = this.album.id;
      if (this.title !== "") params.title = this.title;

      await this.createVideo(params);
      await this.loadAlbum(this.album.id);

      this.title = "";
      this.link = "";
      this.loading_create = false;
    },
  },
};
</script>

<style scoped>
.title {
  margin-top: 0;
  font-family: var(--subtitle-font-family);
}
.inputs-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 5px;
}
</style>