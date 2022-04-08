<template>
  <div>
    <h3 class="title">Edition vidéo YouTube</h3>

    <div v-for="(video, key) in album.videos" :key="video.id" class="wrapper">
      <made-up-button @click="see_video[video.id] = !see_video[video.id]">
        {{ see_video[video.id] ? "Caché la vidéo" : "Voir la vidéo" }}
      </made-up-button>

      <video-player v-show="see_video[video.id]" :video="video" />

      <div class="inputs-wrapper">
        <div class="input">
          <label for="title">Titre : </label>
          <made-up-input v-model="titles[video.id]" id="title" />
        </div>

        <div class="input">
          <label for="link">Lien : </label>
          <made-up-input v-model="links[video.id]" id="link" />
        </div>
      </div>

      <made-up-button
        @click="confirmUpdateVideo(video.id)"
        small
        class="edit-content"
        :loading="loading_edit[video.id]"
      >
        Modifier
      </made-up-button>

      <made-up-button
        @click="confirmRemoveVideo(video.id)"
        small
        class="edit-content"
        :loading="loading_delete[video.id]"
      >
        Supprimer la vidéo
      </made-up-button>

      <div class="separator" v-if="album.videos.length !== key + 1"></div>
    </div>
    <p
      v-if="album.videos !== undefined && album.videos.length === 0"
      class="no-video"
    >
      Pas de vidéo
    </p>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import alert from "@/mixins/alert.js";
import VideoPlayer from "@/components/utils/VideoPlayer.vue";
import MadeUpInput from "@/components/utils/MadeUpInput.vue";
import MadeUpButton from "@/components/utils/MadeUpButton.vue";

export default {
  name: "VideoEdit",
  components: { VideoPlayer, MadeUpInput, MadeUpButton },
  mixins: [alert],

  data() {
    return {
      loading_edit: [],
      loading_delete: [],
      see_video: [],
    };
  },

  computed: {
    ...mapState("album", ["album"]),

    titles() {
      let titles = [];

      this.album.videos.forEach((el) => {
        titles[el.id] = el.title;
      });

      return titles;
    },
    links() {
      let links = [];

      this.album.videos.forEach((el) => {
        links[el.id] = "https://youtu.be/" + el.link;
      });

      return links;
    },
  },

  methods: {
    ...mapActions("video", ["editVideo", "deleteVideo"]),
    ...mapActions("album", ["loadAlbum"]),

    confirmUpdateVideo(id) {
      if (this.loading_edit[id]) return;

      let options = {
        icon: "warning",
        html: `Voulez-vous vraiment modifier cette vidéo YouTube ?<br />`,
        confirmButtonText: "Modifier",
      };

      this.confirm(options, this.updateVideo, id);
    },

    async updateVideo(id) {
      this.loading_edit[id] = true;

      let params = {
        album_id: this.album.id,
        title: this.titles[id],
        link: this.links[id],
      };

      await this.editVideo([id, params]);
      await this.loadAlbum(this.album.id);

      this.loading_edit[id] = false;

      this.valid({
        icon: "success",
        html: "La vidéo a été modifiée avec succès !",
      });
    },

    confirmRemoveVideo(id) {
      if (this.loading_delete[id]) return;

      let options = {
        icon: "warning",
        html: `Voulez-vous vraiment supprimer cette vidéo YouTube ?<br />`,
        confirmButtonText: "Supprimer",
      };

      this.confirm(options, this.removeVideo, id);
    },

    async removeVideo(id) {
      this.loading_delete[id] = true;

      await this.deleteVideo(id);
      await this.loadAlbum(this.album.id);

      this.loading_delete[id] = false;
    },
  },
};
</script>

<style scoped>
.title {
  font-family: var(--subtitle-font-family);
}
.inputs-wrapper {
  margin: 15px auto;
}
.input {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 5px;
}
.edit-content {
  margin-right: 5px;
}
.separator {
  border-bottom: 1px grey solid;
  margin: 15px auto;
}
.no-video {
  font-style: italic;
  font-size: 0.9rem;
}
</style>