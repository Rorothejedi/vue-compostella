<template>
  <div>
    <title-line :title="formattedTitle" />

    <div v-for="(comment, key) in comments" :key="key" class="comment">
      <div class="comment-header">
        <div class="comment-header-text">
          <div class="author" :class="{ admin: isAuthenticated }">
            {{ comment.author }}
          </div>
          <div>
            <span class="date">
              le {{ formatDatetime(comment.created_at) }}
            </span>
            <report-button :comment="comment" />
          </div>
        </div>

        <div class="actions">
          <love-button :comment="comment" />
          <made-up-button
            v-if="isAuthenticated"
            class="action-delete"
            icon
            :loading="loading_delete[comment.id]"
            @click="confirmRemoveComment(comment.id)"
            title="Supprimer ce commentaire"
            color="grey"
          >
            <close-icon fillColor="gray" />
          </made-up-button>
        </div>
      </div>
      <div class="text">
        {{ comment.text }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import alert from "@/mixins/alert.js";
import date from "@/mixins/date.js";
import TitleLine from "@/components/utils/TitleLine.vue";
import LoveButton from "@/components/buttons/LoveButton.vue";
import ReportButton from "@/components/buttons/ReportButton.vue";
import MadeUpButton from "@/components/utils/MadeUpButton.vue";
import CloseIcon from "vue-material-design-icons/Close.vue";

export default {
  name: "CommentList",
  mixins: [date, alert],
  components: {
    TitleLine,
    LoveButton,
    ReportButton,
    MadeUpButton,
    CloseIcon,
  },
  props: {
    comments: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

  data() {
    return {
      loading_delete: [],
    };
  },

  computed: {
    ...mapGetters(["isAuthenticated"]),

    commentsCount() {
      return this.comments.length;
    },
    formattedTitle() {
      let text = "";

      if (this.commentsCount === 0) return "Pas de commentaires";
      if (this.commentsCount >= 1) text = this.commentsCount + " commentaire";
      if (this.commentsCount > 1) text += "s";

      return text;
    },
  },

  methods: {
    ...mapActions("comment", ["reportComment", "deleteComment"]),
    ...mapActions("album", ["loadAlbum"]),

    async confirmRemoveComment(comment_id) {
      if (this.loading_delete[comment_id]) return;

      let options = {
        icon: "warning",
        html: `Voulez-vous supprimer le commentaire n°<strong>${comment_id}</strong> ?<br />`,
        confirmButtonText: "Supprimer",
      };

      if (!(await this.confirm(options))) return;

      this.removeComment(comment_id);
    },

    async removeComment(comment_id) {
      this.loading_delete[comment_id] = true;

      await this.deleteComment(comment_id);
      await this.loadAlbum(this.$route.params.id);

      this.loading_delete[comment_id] = false;

      this.valid({
        icon: "success",
        html: "Le commentaire a été supprimé avec succès !",
      });
    },
  },
};
</script>

<style scoped>
.comment {
  padding: 20px 15px 20px 15px;
  margin: 10px 0px;
  border-radius: 2px;
  transition: background-color 0.3s ease;
}
.comment:hover {
  transition: background-color 0.3s ease;
  background-color: #f3f3f3;
}
.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
}
.comment-header-text {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.author {
  margin-right: 6px;
  font-weight: bold;
  font-family: var(--subtitle-font-family);
}
.date {
  font-size: 12px;
  margin-right: 6px;
  display: inline-flex;
  flex-wrap: wrap;
}
.actions {
  display: flex;
}
.action-delete {
  margin-left: 10px;
}
.text {
  overflow-wrap: break-word;
  white-space: pre-wrap;
  line-height: 21px;
  letter-spacing: 0.2px;
  text-align: justify;
}

/* date and loveButton backline for mobile */
@media (max-width: 767px) {
  .comment-header-text {
    display: block;
  }
  .author {
    text-overflow: ellipsis;
    overflow: hidden;
    width: 70vw;
  }

  /* specific rule for admin */
  .author:is(.admin) {
    width: 61vw;
  }
}
</style>