<template>
  <div class="container dark-theme">
    <br />

    <router-link to="/dashboard" @click="clearAlbum()">
      <button>Retour</button>
    </router-link>

    <br /><br />

    <div v-if="!loading">
      <p v-if="album.created_at !== album.updated_at">
        Dernière modification le {{ formatDatetime(album.updated_at) }}
      </p>
      <p>Créer le {{ formatDatetime(album.created_at) }}</p>
      <p>
        Visible: <strong>{{ album.hide ? "Non " : "Oui " }}</strong>
        <switch-visibility-button :album="album" />
      </p>
      <p>
        Supprimer :
        <delete-button :album="album" />
      </p>
    </div>

    <album-edit-form :loading="loading" />

    <div v-if="!loading">
      <image-new />
      <images-edit />
    </div>

    <br />
    <p v-if="loading">Loading...</p>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import date from "@/mixins/date.js";
import SwitchVisibilityButton from "@/components/edit/SwitchVisibilityButton.vue";
import DeleteButton from "@/components/edit/DeleteButton.vue";
import AlbumEditForm from "@/components/albumEdit/AlbumEditForm.vue";
import ImageNew from "@/components/albumEdit/ImageNew.vue";
import ImagesEdit from "@/components/albumEdit/ImagesEdit.vue";

export default {
  name: "AlbumEdit",
  components: {
    SwitchVisibilityButton,
    DeleteButton,
    ImageNew,
    ImagesEdit,
    AlbumEditForm,
  },
  mixins: [date],

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

<style scoped>
</style>