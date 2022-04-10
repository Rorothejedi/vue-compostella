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

    <div v-if="!loading" class="main-data-wrapper">
      <div v-if="album.created_at !== album.updated_at" class="date">
        <div>Dernière modification :</div>
        <div class="main-data">{{ formatDatetime(album.updated_at) }}</div>
      </div>
      <div class="date">
        <div>Date de création :</div>
        <div class="main-data">{{ formatDatetime(album.created_at) }}</div>
      </div>
      <div class="button">
        <switch-visibility-button :album="album" full />
        <div class="main-data">
          {{ album.hide ? "Caché " : "Visible " }}
        </div>
      </div>
      <div class="button">
        <delete-button :album="album" full />
      </div>
    </div>

    <album-edit-form :loading="loading" />

    <div v-if="!loading" class="images">
      <image-new />
      <div class="separator"></div>
      <images-edit />
    </div>

    <div class="videos">
      <video-new :loading="loading" />
      <div class="separator"></div>
      <video-edit />
    </div>

    <br />
    <p v-if="loading">Loading...</p>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import title from "@/mixins/title.js";
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
  title: "Edition album d'étape | Sur les chemins de Compostelle",
  mixins: [title, date],
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

.main-data-wrapper {
  border: 1px dashed grey;
  border-radius: 4px;
  padding: 20px;
  margin-top: 10px;
}

.date {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 5px;
}
.date :first-child {
  width: 250px;
}
.main-data {
  font-family: var(--subtitle-font-family);
  border-bottom: 1px solid grey;
}

.button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  flex-wrap: wrap;
}

.images,
.videos {
  border: 1px dashed grey;
  border-radius: 4px;
  padding: 20px;
  margin-top: 10px;
}
.separator {
  border-bottom: 1px dashed grey;
  margin: 20px -20px;
}
</style>