<template>
  <div>
    <TitleLine :title="formattedTitle" />

    <div v-for="(comment, key) in comments" :key="key" class="comment">
      <div class="comment-header">
        <span class="author">{{ comment.author }}</span>
        <span class="date"> le {{ formatDatetime(comment.created_at) }}</span>
      </div>
      <div>
        {{ comment.text }}
      </div>
    </div>
  </div>
</template>

<script>
import date from "@/mixins/date.js";
import TitleLine from "@/components/utils/TitleLine.vue";

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

  computed: {
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
};
</script>

<style scoped>
.comment {
  margin-bottom: 40px;
}
.comment-header {
  margin-bottom: 8px;
}
.author {
  margin-right: 6px;
  font-weight: bold;
  font-family: var(--subtitle-font-family);
}
.date {
  font-size: 12px;
}
</style>