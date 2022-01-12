<template>
  <div>
    <TitleLine :title="lineTitleText" />

    <div v-for="(comment, key) in comments" :key="key" class="comment">
      <div class="comment-header">
        <span class="author">{{ comment.author }}</span>
        <span class="date"> le {{ formatDate(comment.created_at) }}</span>
      </div>
      <div>
        {{ comment.text }}
      </div>
    </div>
  </div>
</template>

// TODO
// Ajout du bouton de report
// Ajout du bloc d'ajout de commentaire (avec nom / textarea / submit)

<script>
import moment from "moment";
import TitleLine from "@/components/album/TitleLine.vue";

export default {
  name: "CommentList",
  components: { TitleLine },
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
    lineTitleText() {
      let text = "";

      if (this.commentsCount === 0) text = "Pas de commentaires";
      if (this.commentsCount >= 1) text = this.commentsCount + " commentaire";
      if (this.commentsCount > 1) text += "s";

      return text;
    },
  },

  created() {
    this.moment = moment;
  },

  methods: {
    formatDate(date) {
      return this.moment(date).locale("fr").format("LL");
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