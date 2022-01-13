<template>
  <div class="container dark-theme">
    <div class="header">
      <router-link to="/" class="back">←</router-link>
      <Divider />
      <h2 class="places">Espace admin</h2>
    </div>
    <input v-model="email" placeholder="Email" type="email" />
    <input v-model="password" placeholder="Mot de passe" type="password" />
    <button @click="submitLogin()">
      OK <span v-if="loading">loading...</span>
    </button>
    <p>token: {{ token }}</p>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
import Divider from "@/components/utils/Divider.vue";

export default {
  name: "Login",
  components: { Divider },

  data() {
    return {
      email: "",
      password: "",
      loading: false,
    };
  },

  computed: {
    ...mapState("user", ["token"]),
  },

  methods: {
    ...mapActions("user", ["login"]),

    submitLogin() {
      if (this.loading) return;

      this.loading = true;
      this.login([this.email, this.password]).then(() => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        this.$router.push("/dashboard");
        this.loading = false;
        this.email = "";
        this.password = "";
      });
    },
  },
};
</script>

<style>
</style>

<style scoped>
body {
  background-color: var(--secondary-bg-color);
}
.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.back {
  text-decoration: none;
}
</style>