<template>
  <div class="container">
    <div v-if="!loading">
      <title-line :title="formattedCommentTitle" />

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
            <made-up-button
              @click="confirmResetReport(comment.id)"
              icon
              small
              :loading="loading_reset[comment.id]"
              class="reset-button"
              title="Valider ce commentaire"
            >
              <check-icon />
            </made-up-button>

            <made-up-button
              @click="confirmRemoveComment(comment.id)"
              icon
              small
              :loading="loading_delete[comment.id]"
              title="Supprimer ce commentaire"
            >
              <close-icon />
            </made-up-button>
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
import title from "@/mixins/title.js";
import alert from "@/mixins/alert.js";
import TitleLine from "@/components/utils/TitleLine.vue";
import Divider from "@/components/utils/Divider.vue";
import MadeUpButton from "@/components/utils/MadeUpButton.vue";
import CheckIcon from "vue-material-design-icons/Check.vue";
import CloseIcon from "vue-material-design-icons/Close.vue";

export default {
  name: "CommentsReport",
  title: "Commentaires signalés | Sur les chemins de Compostelle",
  mixins: [title, alert],
  components: { TitleLine, Divider, MadeUpButton, CheckIcon, CloseIcon },

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
      if (this.commentsCount === 0) return "Aucun signalement";
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

    async confirmResetReport(id) {
      if (this.loading_reset[id]) return;

      let options = {
        icon: "question",
        html: `Voulez-vous valider le commentaire n°<strong>${id}</strong> ?<br />`,
        confirmButtonText: "Valider",
      };

      if (!(await this.confirm(options))) return;

      this.resetReport(id);
    },

    async resetReport(id) {
      this.loading_reset[id] = true;

      await this.resetReportedComment(id);
      await this.loadReportedComments();

      this.loading_reset[id] = false;
    },

    async confirmRemoveComment(id) {
      if (this.loading_delete[id]) return;

      let options = {
        icon: "warning",
        html: `Voulez-vous supprimer le commentaire n°<strong>${id}</strong> ?<br />`,
        confirmButtonText: "Supprimer",
      };

      if (!(await this.confirm(options))) return;

      this.removeComment(id);
    },

    async removeComment(id) {
      this.loading_delete[id] = true;

      await this.deleteComment(id);
      await this.loadReportedComments();

      this.loading_delete[id] = false;
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
  background-color: var(--main-bg-hv-color);
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
  text-align: justify;
}

.text {
  overflow-wrap: break-word;
  font-style: italic;
  white-space: pre-wrap;
}

.reset-button {
  margin-right: 3px;
}
</style>