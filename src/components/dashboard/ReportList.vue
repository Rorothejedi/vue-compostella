<template>
  <div>
    <div v-if="!loadingComments">
      <TitleLine :title="formattedCommentTitle" dark />

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
            <Divider smallMargin />
            <div>
              Report:
              <span class="bold">{{ comment.report }}</span>
            </div>
          </div>

          <div>
            <button @click="resetReport(comment.id)">
              ✔ <span v-if="loadingReset[comment.id]">loading...</span>
            </button>
            <button @click="deleteComment(comment.id)">
              ✖ <span v-if="loadingDelete[comment.id]">loading...</span>
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

// TODO
// Faire un loading correct
// Ajouter une icone cross pour la suppression
// Intégrer de vrais boutons

<script>
import { mapState, mapActions } from "vuex";
import TitleLine from "@/components/utils/TitleLine.vue";
import Divider from "@/components/utils/Divider.vue";

export default {
  name: "ReportList",
  components: { TitleLine, Divider },

  data() {
    return {
      loadingComments: false,
      loadingReset: [],
      loadingDelete: [],
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
  },

  mounted() {
    this.fetchReportedComments();
  },

  methods: {
    ...mapActions("comment", [
      "loadReportedComments",
      "resetReportedComment",
      "deleteReportedComment",
    ]),

    fetchReportedComments() {
      this.loadingComments = true;
      this.loadReportedComments().then(() => {
        this.loadingComments = false;
      });
    },

    resetReport(id) {
      this.loadingReset[id] = true;
      this.resetReportedComment(id).then(() => {
        this.loadReportedComments().then(() => {
          this.loadingReset[id] = false;
        });
      });
    },

    deleteComment(id) {
      this.loadingDelete[id] = true;
      this.deleteReportedComment(id).then(() => {
        this.loadReportedComments().then(() => {
          this.loadingDelete[id] = false;
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
.bold {
  font-weight: bold;
}

.text {
  margin-top: 10px;
}

.text {
  overflow-wrap: break-word;
  font-style: italic;
}
</style>