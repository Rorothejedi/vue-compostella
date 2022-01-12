<template>
  <div class="container">
    <div>Dashboard</div>

    <div v-if="!loadingComments">
      <div v-for="comment in reportedComments" :key="comment.id">
        <p>
          Commentaire {{ comment.author }} de Rapporté {{ comment.report }} fois
          <br />
          Text: {{ comment.text }}
        </p>
      </div>
    </div>
    <div v-else>
      <p>Loading comments ...</p>
    </div>

    <div>
      <button @click="fetchLogout()">Déconnexion</button>
    </div>
    <div>
      <router-link to="/">
        <button>Home</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Dashboard",

  data() {
    return {
      loadingComments: false,
    };
  },

  computed: {
    ...mapState("comment", ["reportedComments"]),
  },

  mounted() {
    this.fetchReportedComments();
  },

  methods: {
    ...mapActions("comment", ["loadReportedComments"]),
    ...mapActions("user", ["logout"]),

    fetchReportedComments() {
      this.loadingComments = true;
      this.loadReportedComments().then(() => {
        this.loadingComments = false;
      });
    },

    fetchLogout() {
      this.logout().then(() => {
        this.$router.push("/admin");
      });
    },
  },
};
</script>