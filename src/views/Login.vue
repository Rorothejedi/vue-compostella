<template>
  <div class="container dark-theme">
    <back-to-home-header title="Espace admin" />

    <div class="login-wrapper">
      <div>
        <div class="input-wrapper">
          <made-up-input
            v-model="email"
            placeholder="Email"
            :disabled="loading"
            type="email"
            fullWidthMobile
            large
            ref="email"
          />
        </div>

        <div class="input-wrapper">
          <made-up-input
            v-model="password"
            placeholder="Mot de passe"
            :disabled="loading"
            type="password"
            fullWidthMobile
            large
          />
        </div>

        <br />

        <div class="comment-submit-wrapper">
          <made-up-button
            :loading="loading"
            @click="submitLogin()"
            :disabled="!email || !password"
          >
            Connexion
          </made-up-button>
          <shield-check-icon
            class="shield-icon"
            v-tooltip.right="'Protégé avec Google reCAPTCHA v3'"
            fillColor="#aaa"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
import title from "@/mixins/title.js";
import alert from "@/mixins/alert.js";
import recaptcha from "@/mixins/recaptcha.js";
import BackToHomeHeader from "@/components/utils/BackToHomeHeader.vue";
import MadeUpInput from "@/components/utils/MadeUpInput.vue";
import MadeUpButton from "@/components/utils/MadeUpButton.vue";
import ShieldCheckIcon from "vue-material-design-icons/ShieldCheck.vue";

export default {
  name: "Login",
  title: "Espace admin | Sur les chemins de Compostelle",
  mixins: [title, alert, recaptcha],
  components: {
    BackToHomeHeader,
    MadeUpInput,
    MadeUpButton,
    ShieldCheckIcon,
  },

  data() {
    return {
      email: "",
      password: "",
      loading: false,
    };
  },

  computed: {
    ...mapState("auth", ["token"]),
  },

  errorCaptured() {
    if (this.loading) this.loading = false;

    this.valid({
      icon: "error",
      html: "Une erreur s'est produite...<br />Merci de vérifier que les informations sont correctement remplies.<br/><br/><small><i>Ou peut-être êtes-vous un robot ?!</i></small>",
    });

    this.resetForm();

    return false;
  },

  methods: {
    ...mapActions("auth", ["login"]),
    ...mapActions("comment", ["loadReportedComments"]),

    async submitLogin() {
      if (this.loading) return;

      this.loading = true;

      await this.recaptcha();

      const params = {
        email: this.email,
        password: this.password,
        "g-recaptcha-response": this.recaptcha_token,
      };

      await this.login(params);

      axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;

      await this.loadReportedComments();

      this.resetForm();

      this.$router.push("/");
    },

    resetForm() {
      this.loading = false;
      this.email = "";
      this.password = "";
    },
  },
};
</script>

<style scoped>
.login-wrapper {
  height: calc(100vh - 180px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.input-wrapper {
  margin-top: 10px;
}
.comment-submit-wrapper {
  display: flex;
  align-items: center;
}
.shield-icon {
  margin-left: 10px;
}
</style>