<template>
  <transition name="slide-down">
    <div class="admin-navbar" v-if="isAuthenticated">
      <div class="container admin-navbar-content">
        <div>
          <router-link to="/">
            <made-up-button title="Accueil" small>
              <home-icon />
            </made-up-button>
          </router-link>
          <router-link to="/albums-manage" class="space">
            <made-up-button small> Gérer les albums </made-up-button>
          </router-link>
          <router-link to="/comments-report" class="space">
            <made-up-button
              title="Commentaires signalés"
              class="icon-cart"
              small
            >
              <comment-alert-icon />
              <span class="count">{{ reportedComments.length }}</span>
            </made-up-button>
          </router-link>
        </div>

        <router-link to="/">
          <made-up-button
            @click="logoutWithLoading()"
            :loading="loading_logout"
            title="Déconnexion"
            icon
            small
          >
            <power-icon />
          </made-up-button>
        </router-link>
      </div>
    </div>
  </transition>

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
import MadeUpButton from "@/components/utils/MadeUpButton.vue";
import HomeIcon from "vue-material-design-icons/Home.vue";
import PowerIcon from "vue-material-design-icons/Power.vue";
import CommentAlertIcon from "vue-material-design-icons/CommentAlert.vue";

import "floating-vue/dist/style.css";

export default {
  components: {
    MadeUpButton,
    HomeIcon,
    CommentAlertIcon,
    PowerIcon,
  },

  data() {
    return {
      loading_logout: false,
    };
  },

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
    ...mapActions("auth", ["logout"]),
    ...mapActions("comment", ["loadReportedComments"]),

    /* Auth methods */

    async logoutWithLoading() {
      if (this.loading_logout) return;

      this.loading_logout = true;

      await this.logout();

      this.loading_logout = false;
    },

    logoutWhenUnauthenticatedResponse() {
      axios.interceptors.response.use(
        function (response) {
          return response;
        },
        function (error) {
          if (error.response.status === 401) {
            store.commit("auth/LOG_ERROR");
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
@import "./styles/alert.css";
</style>

<style scoped>
.admin-navbar {
  width: 100%;
  min-height: 30px;
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
.space {
  margin-left: 5px;
}

/* admin navbar transition */

.slide-down-leave-to,
.slide-down-enter-from {
  margin-bottom: -50px;
  transform: translateY(-100px);
}
.slide-down-enter-active {
  transition: all 0.4s ease-out 1.8s;
}
.slide-down-leave-active {
  transition: all 0.4s ease-in;
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

  min-width: 15px;
  height: 15px;
  background-color: var(--secondary-text-color);
  border-radius: 100px;
  left: 30px;
  bottom: 2px;

  color: #fff;
  font-size: 11px;
}
</style>
