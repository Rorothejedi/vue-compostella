<template>
  <div class="love">
    <made-up-button
      icon
      flat
      :loading="loading"
      color="grey"
      @click="
        isLiked(comment.id)
          ? unlikeComment(comment.id)
          : likeComment(comment.id)
      "
    >
      <heart-icon :fillColor="isLiked(comment.id) ? '#ee7ca2' : '#aaa'" />
    </made-up-button>
    <div class="love-count">
      {{ comment.love }}
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import alert from "@/mixins/alert.js";
import recaptcha from "@/mixins/recaptcha.js";
import MadeUpButton from "@/components/utils/MadeUpButton.vue";
import HeartIcon from "vue-material-design-icons/Heart.vue";

export default {
  name: "LoveButton",
  mixins: [alert, recaptcha],
  components: {
    MadeUpButton,
    HeartIcon,
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
      comments_liked: [],
    };
  },

  mounted() {
    this.getCommentsLiked();
  },

  errorCaptured() {
    if (this.loading) this.loading = false;

    this.valid({
      icon: "error",
      html: "Une erreur s'est produite...<br/><br/><small><i>Ou peut-être êtes-vous un robot ?!</i></small>",
    });

    return false;
  },

  methods: {
    ...mapActions("comment", ["loveComment", "unloveComment"]),
    ...mapActions("album", ["loadAlbum"]),

    async likeComment(comment_id) {
      if (this.loading) return;

      this.loading = true;

      await this.recaptcha();

      const params = {
        "g-recaptcha-response": this.recaptcha_token,
      };

      await this.loveComment([comment_id, params]);
      await this.loadAlbum(this.$route.params.id);
      this.addCommentsLiked(comment_id);

      this.loading = false;
    },

    async unlikeComment(comment_id) {
      if (this.loading) return;

      this.loading = true;

      await this.recaptcha();

      const params = {
        "g-recaptcha-response": this.recaptcha_token,
      };

      await this.unloveComment([comment_id, params]);
      await this.loadAlbum(this.$route.params.id);
      this.removeCommentsLiked(comment_id);

      this.loading = false;
    },

    /* LocalStorage for comments_liked */

    getCommentsLiked() {
      if (!localStorage.getItem("comments_liked")) return;

      try {
        this.comments_liked = JSON.parse(
          localStorage.getItem("comments_liked")
        );
      } catch (e) {
        localStorage.removeItem("comments_liked");
      }
    },

    addCommentsLiked(comment_id) {
      this.getCommentsLiked();

      this.comments_liked.push(comment_id);
      this.saveCommentsLiked();
    },
    removeCommentsLiked(comment_id) {
      this.getCommentsLiked();

      let index = this.comments_liked.indexOf(comment_id);

      this.comments_liked.splice(index, 1);
      this.saveCommentsLiked();
    },
    saveCommentsLiked() {
      const parsed = JSON.stringify(this.comments_liked);

      localStorage.setItem("comments_liked", parsed);
    },

    isLiked(comment_id) {
      return this.comments_liked.indexOf(comment_id) !== -1;
    },
  },
};
</script>

<style scoped>
.love {
  display: flex;
  align-items: center;
}
.love-count {
  font-family: var(--subtitle-font-family);
}
</style>