<template>
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

export default {
  created() {
    this.logoutForUnauthenticatedResponse();
  },

  methods: {
    logoutForUnauthenticatedResponse() {
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
