<template>
  <div class="container dark-theme">
    <div v-if="!loading">
      <title-line :title="formattedCommentTitle" dark />

      <div
        v-for="comment in reportedComments"
        :key="comment.id"
        class="comment"
      >
        <div class="header">
          <div>
            <div>
              ID:
              <span class="bold">{{ comment.id }}</span>
            </div>
            <divider smallMargin />
            <div>
              Report:
              <span class="bold">{{ comment.report }}</span>
            </div>
          </div>

          <div>
            <button @click="resetReport(comment.id)">
              ✔ <span v-if="loading_reset[comment.id]">loading...</span>
            </button>
            <button @click="removeComment(comment.id)">
              ✖ <span v-if="loading_delete[comment.id]">loading...</span>
            </button>
          </div>
        </div>

        <div class="author">
          Auteur:
          <span class="bold">{{ comment.author }}</span>
        </div>

        <div class="text">
          <span v-if="comment.text.length > 0">{{ comment.text }}</span>
          <span v-else>Pas de texte...</span>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading comments ...</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import TitleLine from "@/components/utils/TitleLine.vue";
import Divider from "@/components/utils/Divider.vue";

export default {
  name: "CommentsReport",
  components: { TitleLine, Divider },

  data() {
    return {
      loading_reset: [],
      loading_delete: [],
    };
  },

  computed: {
    ...mapState("comment", ["reportedComments"]),

    commentsCount() {
      return this.reportedComments.length;
    },

    formattedCommentTitle() {
      if (this.commentsCount === 0) return "Pas de commentaires signalés";
      return this.commentsCount + " commentaires signalés";
    },

    loading() {
      return this.reportedComments.constructor === Object;
    },
  },

  methods: {
    ...mapActions("comment", [
      "resetReportedComment",
      "loadReportedComments",
      "deleteComment",
    ]),

    resetReport(id) {
      this.loading_reset[id] = true;

      this.resetReportedComment(id).then(() => {
        this.loadReportedComments().then(() => {
          this.loading_reset[id] = false;
        });
      });
    },

    removeComment(id) {
      this.loading_delete[id] = true;

      this.deleteComment(id).then(() => {
        this.loadReportedComments().then(() => {
          this.loading_delete[id] = false;
        });
      });
    },
  },
};
</script>

<style scoped>
.comment {
  transition: background-color 0.3s ease;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 2px;
}
.comment:hover {
  transition: background-color 0.3s ease;
  background-color: var(--main-text-color);
}

.header,
.header > div {
  display: flex;
}
.header {
  justify-content: space-between;
  align-items: center;
}

.text {
  margin-top: 10px;
}

.text {
  overflow-wrap: break-word;
  font-style: italic;
  white-space: pre-wrap;
}
</style>