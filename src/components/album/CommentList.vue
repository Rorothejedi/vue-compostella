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
            color="grey"
            @click="removeComment(comment.id)"
            title="Supprimer ce commentaire"
          >
            <close-icon fillColor="grey" />
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
import date from "@/mixins/date.js";
import TitleLine from "@/components/utils/TitleLine.vue";
import { mapActions, mapGetters } from "vuex";
import LoveButton from "@/components/buttons/LoveButton.vue";
import ReportButton from "@/components/buttons/ReportButton.vue";
import MadeUpButton from "@/components/utils/MadeUpButton.vue";
import CloseIcon from "vue-material-design-icons/Close.vue";

export default {
  name: "CommentList",
  components: {
    TitleLine,
    LoveButton,
    ReportButton,
    MadeUpButton,
    CloseIcon,
  },
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

      if (this.commentsCount === 0) text = "Pas de commentaires";
      if (this.commentsCount >= 1) text = this.commentsCount + " commentaire";
      if (this.commentsCount > 1) text += "s";

      return text;
    },
  },

  methods: {
    ...mapActions("comment", ["reportComment", "deleteComment"]),
    ...mapActions("album", ["loadAlbum"]),

    removeComment(comment_id) {
      if (this.loading_delete[comment_id]) return;

      this.loading_delete[comment_id] = true;

      this.deleteComment(comment_id).then(() => {
        this.loadAlbum(this.$route.params.id).then(() => {
          this.loading_delete[comment_id] = false;
        });
      });
    },
  },
};
</script>

<style scoped>
.comment {
  padding: 15px;
  margin: 10px 0px;
  border-radius: 2px;
  transition: background-color 0.3s ease;
}
.comment:hover {
  transition: background-color 0.3s ease;
  background-color: rgb(243, 243, 243);
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