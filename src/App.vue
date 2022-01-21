<template>
  <div class="admin-navbar" v-if="isAuthenticated">
    <div class="container admin-navbar-content">
      <div>
        <router-link to="/">
          <button @click="clearAlbums()">Accueil</button>
        </router-link>
        <router-link to="/albums-manage">
          <button @click="clearAlbums()">Gérer les albums</button>
        </router-link>
        <router-link to="/comments-report">
          <button>Signalements ({{ reportedComments.length }})</button>
        </router-link>
      </div>

      <router-link to="/">
        <button @click="logout()">Déconnexion</button>
      </router-link>
    </div>
  </div>

  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition || 'fade'" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import axios from "axios";
import store from "./store";
import router from "./router";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  computed: {
    ...mapGetters(["isAuthenticated"]),
    ...mapState("comment", ["reportedComments"]),
  },

  created() {
    this.logoutWhenUnauthenticatedResponse();
  },

  mounted() {
    if (this.isAuthenticated) this.loadReportedComments();
  },

  methods: {
    ...mapActions("album", ["clearAlbums"]),
    ...mapActions("user", ["logout"]),
    ...mapActions("comment", ["loadReportedComments"]),

    /* Auth methods */

    logoutWhenUnauthenticatedResponse() {
      axios.interceptors.response.use(
        function (response) {
          return response;
        },
        function (error) {
          if (error.response.status === 401) {
            store.commit("user/LOG_ERROR");
            router.push("/admin");
          }
          return Promise.reject(error);
        }
      );
    },
  },
};
</script>

<style>
@import "./styles/normalize.css";
@import "./styles/main.css";
</style>

<style scoped>
.admin-navbar {
  width: 100%;
  min-height: 50px;
  height: auto;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: var(--dark-top-color);
  display: flex;
  align-items: center;
}
.admin-navbar-content {
  display: flex;
  justify-content: space-between;
  padding-bottom: 0px;
}
</style>
