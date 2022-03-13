<template>
  <made-up-button
    icon
    small
    flat
    :loading="loading"
    :disabled="isReported()"
    :title="
      isReported()
        ? 'Vous avez déjà signalé ce commentaire'
        : 'Signaler ce commentaire'
    "
    color="#aaa"
    @click="confirmReportsComment()"
  >
    <alert-circle-check-outline-icon
      v-if="isReported()"
      fillColor="#aca"
      :size="20"
    />
    <alert-circle-outline-icon v-else fillColor="#aaa" :size="20" />
  </made-up-button>
</template>

<script>
import { mapActions } from "vuex";
import alert from "@/mixins/alert.js";
import MadeUpButton from "@/components/utils/MadeUpButton.vue";
import AlertCircleOutlineIcon from "vue-material-design-icons/AlertCircleOutline.vue";
import AlertCircleCheckOutlineIcon from "vue-material-design-icons/AlertCircleCheckOutline.vue";

export default {
  name: "ReportButton",
  mixins: [alert],
  components: {
    MadeUpButton,
    AlertCircleOutlineIcon,
    AlertCircleCheckOutlineIcon,
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
      comments_reported: [],
    };
  },

  mounted() {
    this.getCommentsReported();
  },

  methods: {
    ...mapActions("comment", ["reportComment"]),
    ...mapActions("album", ["loadAlbum"]),

    confirmReportsComment() {
      if (this.loading) return;

      let options = {
        icon: "question",
        html: `Voulez-vous vraiment signaler ce commentaire posté par <strong>${this.comment.author}</strong> ?<br />`,
        confirmButtonText: "Signaler",
      };

      let options_alert_after = {
        icon: "success",
        text: `Merci pour votre signalement et votre vigilance !`,
      };

      this.confirm(options, this.reportsComment, null, options_alert_after);
    },

    reportsComment() {
      this.loading = true;
      this.reportComment(this.comment.id).then(() => {
        this.addCommentsReported(this.comment.id);
        this.loading = false;
      });
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

    addCommentsReported() {
      this.comments_reported.push(this.comment.id);
      const parsed = JSON.stringify(this.comments_reported);
      localStorage.setItem("comments_reported", parsed);
    },
    isReported() {
      return this.comments_reported.indexOf(this.comment.id) !== -1;
    },
  },
};
</script>

<style scoped>
</style>