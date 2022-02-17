<template>
  <div class="container dark-theme">
    <br />

    <div class="buttons-wrapper">
      <router-link to="/albums-manage" @click="clearAlbum()">
        <made-up-button icon large>
          <arrow-left-icon />
        </made-up-button>
      </router-link>
      <router-link :to="`/album/${$route.params.id}`">
        <made-up-button> Voir album public </made-up-button>
      </router-link>
    </div>

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

    <video-new :loading="loading" />
    <video-edit />

    <br />
    <p v-if="loading">Loading...</p>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import date from "@/mixins/date.js";
import MadeUpButton from "@/components/utils/MadeUpButton.vue";
import ArrowLeftIcon from "vue-material-design-icons/ArrowLeft.vue";
import SwitchVisibilityButton from "@/components/buttons/SwitchVisibilityButton.vue";
import DeleteButton from "@/components/buttons/DeleteButton.vue";
import AlbumEditForm from "@/components/albumEdit/AlbumEditForm.vue";
import ImageNew from "@/components/albumEdit/ImageNew.vue";
import ImagesEdit from "@/components/albumEdit/ImagesEdit.vue";
import VideoNew from "@/components/albumEdit/VideoNew.vue";
import VideoEdit from "@/components/albumEdit/VideoEdit.vue";

export default {
  name: "AlbumEdit",
  components: {
    MadeUpButton,
    ArrowLeftIcon,
    SwitchVisibilityButton,
    DeleteButton,
    ImageNew,
    ImagesEdit,
    AlbumEditForm,
    VideoNew,
    VideoEdit,
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
.buttons-wrapper {
  display: flex;
  justify-content: space-between;
}
</style>