<template>
  <div>
    <p>Video edit</p>

    <div v-for="video in album.videos" :key="video.id">
      <video-player :video="video" />

      <div class="edit-wrapper">
        <div class="edit-content">
          <label for="title">Titre : </label>
          <input type="text" v-model="titles[video.id]" id="title" />
        </div>

        <div class="edit-content">
          <label for="link">Lien : </label>
          <input type="text" v-model="links[video.id]" id="link" />
        </div>

        <made-up-button
          @click="updateVideo(video.id)"
          small
          class="edit-content"
          :loading="loading_edit[video.id]"
        >
          Modifier
        </made-up-button>

        <made-up-button
          @click="removeVideo(video.id)"
          small
          class="edit-content"
          :loading="loading_delete[video.id]"
        >
          Supprimer la vidéo
        </made-up-button>
      </div>

      <hr />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import VideoPlayer from "@/components/utils/VideoPlayer.vue";
import MadeUpButton from "@/components/utils/MadeUpButton.vue";

export default {
  name: "VideoEdit",
  components: { VideoPlayer, MadeUpButton },

  data() {
    return {
      loading_edit: [],
      loading_delete: [],
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

    updateVideo(id) {
      this.loading_edit[id] = true;

      let params = {
        album_id: this.album.id,
        title: this.titles[id],
        link: this.links[id],
      };

      this.editVideo([id, params]).then(() => {
        this.loadAlbum(this.album.id).then(() => {
          this.loading_edit[id] = false;
        });
      });
    },

    removeVideo(id) {
      this.loading_delete[id] = true;

      this.deleteVideo(id).then(() => {
        this.loadAlbum(this.album.id).then(() => {
          this.loading_delete[id] = false;
        });
      });
    },
  },
};
</script>

<style scoped>
.edit-wrapper {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}
.edit-content {
  margin-right: 5px;
}
</style>