<template>
  <div>
    <title-line :title="formattedTitle" />

    <div v-for="(comment, key) in comments" :key="key" class="comment">
      <div class="comment-header">
        <div>
          <span class="author">{{ comment.author }}</span>
          <span class="date"> le {{ formatDatetime(comment.created_at) }}</span>
        </div>
        <div>
          {{ comment.love }} like
          <button
            @click="
              isLiked(comment.id)
                ? unlikeComment(comment.id)
                : likeComment(comment.id)
            "
            title="J'aime ce commentaire"
          >
            {{ isLiked(comment.id) ? "♡ unlike" : "❤ like" }}
            <span v-if="loading_like[comment.id]">loading...</span>
          </button>
          <button
            @click="reportsComment(comment.id)"
            title="Signaler ce commentaire"
            :disabled="isReported(comment.id)"
          >
            🏴 <span v-if="loading_report[comment.id]">loading...</span>
          </button>
          <button
            v-if="isAuthenticated"
            @click="removeComment(comment.id)"
            title="Supprimer ce commentaire"
          >
            ✖ <span v-if="loading_delete[comment.id]">loading...</span>
          </button>
        </div>
      </div>
      <div class="text">
        {{ comment.text }}
      </div>
    </div>
  </div>
</template>

<script>
import date from "@/mixins/date.js";
import TitleLine from "@/components/utils/TitleLine.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CommentList",
  components: { TitleLine },
  mixins: [date],

  props: {
    comments: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

  data() {
    return {
      loading_like: [],
      loading_report: [],
      loading_delete: [],

      comments_liked: [],
      comments_reported: [],
    };
  },

  computed: {
    ...mapGetters(["isAuthenticated"]),

    commentsCount() {
      return this.comments.length;
    },
    formattedTitle() {
      let text = "";

      if (this.commentsCount === 0) text = "Pas de commentaires";
      if (this.commentsCount >= 1) text = this.commentsCount + " commentaire";
      if (this.commentsCount > 1) text += "s";

      return text;
    },
  },

  mounted() {
    this.getCommentsLiked();
    this.getCommentsReported();
  },

  methods: {
    ...mapActions("comment", [
      "loveComment",
      "unloveComment",
      "reportComment",
      "deleteComment",
    ]),
    ...mapActions("album", ["loadAlbum"]),

    reportsComment(comment_id) {
      if (this.loading_report[comment_id]) return;

      this.loading_report[comment_id] = true;

      this.reportComment(comment_id).then(() => {
        this.addCommentsReported(comment_id);
        this.loading_report[comment_id] = false;
        console.log("Commentaire signalé avec succès !");
      });
    },

    likeComment(comment_id) {
      if (this.loading_like[comment_id]) return;

      this.loading_like[comment_id] = true;

      this.loveComment(comment_id).then(() => {
        this.loadAlbum(this.$route.params.id).then(() => {
          this.addCommentsLiked(comment_id);

          this.loading_like[comment_id] = false;
          console.log("Commentaire aimé avec succès !");
        });
      });
    },

    unlikeComment(comment_id) {
      if (this.loading_like[comment_id]) return;

      this.loading_like[comment_id] = true;

      this.unloveComment(comment_id).then(() => {
        this.loadAlbum(this.$route.params.id).then(() => {
          this.removeCommentsLiked(comment_id);

          this.loading_like[comment_id] = false;
          console.log("Commentaire retiré avec succès !");
        });
      });
    },

    removeComment(comment_id) {
      if (this.loading_delete[comment_id]) return;

      this.loading_delete[comment_id] = true;

      this.deleteComment(comment_id).then(() => {
        this.loadAlbum(this.$route.params.id).then(() => {
          this.loading_delete[comment_id] = false;
          console.log("Commentaire supprimé avec succès !");
        });
      });
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
      this.comments_liked.push(comment_id);
      this.saveCommentsLiked();
    },
    removeCommentsLiked(comment_id) {
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

    /* LocalStorage for comments_reported */

    getCommentsReported() {
      if (!localStorage.getItem("comments_reported")) return;

      try {
        this.comments_reported = JSON.parse(
          localStorage.getItem("comments_reported")
        );
      } catch (e) {
        localStorage.removeItem("comments_reported");
      }
    },

    addCommentsReported(comment_id) {
      this.comments_reported.push(comment_id);
      const parsed = JSON.stringify(this.comments_reported);
      localStorage.setItem("comments_reported", parsed);
    },
    isReported(comment_id) {
      return this.comments_reported.indexOf(comment_id) !== -1;
    },
  },
};
</script>

<style scoped>
.comment {
  margin-bottom: 40px;
}
.comment-header {
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
}
.author {
  margin-right: 6px;
  font-weight: bold;
  font-family: var(--subtitle-font-family);
}
.date {
  font-size: 12px;
}
.text {
  overflow-wrap: break-word;
}
</style>