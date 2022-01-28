<template>
  <div class="admin-navbar" v-if="isAuthenticated">
    <div class="container admin-navbar-content">
      <div>
        <router-link to="/">
          <button @click="clearAlbums()">Accueil</button>
        </router-link>
        <router-link to="/albums-manage">
          <button
            @click="$route.path === '/albums-manage' ? '' : clearAlbums()"
          >
            Gérer les albums
          </button>
        </router-link>
        <router-link to="/comments-report">
          <button>
            <!-- TODO -->
            <!-- Refacto buttons -->
            <div class="icon-cart">
              Commentaires signalés
              <div class="count">{{ reportedComments.length }}</div>
            </div>
          </button>
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

<style>
.icon-cart {
  display: inline-block;
  position: relative;
}
.icon-cart .count {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 100px;
  left: 10px;
  bottom: 0px;

  color: #fff;
  font-size: 11px;
}
</style>
