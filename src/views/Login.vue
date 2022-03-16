<template>
  <div class="container dark-theme">
    <back-to-home-header title="Espace admin" />

    <div class="login-wrapper">
      <div>
        <made-up-input-text
          v-model="email"
          placeholder="Email"
          :disabled="loading"
          type="email"
          fullWidthMobile
        />

        <br />

        <made-up-input-text
          v-model="password"
          placeholder="Mot de passe"
          :disabled="loading"
          type="password"
          fullWidthMobile
        />

        <br />
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

        <div class="error-wrapper">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
import BackToHomeHeader from "@/components/utils/BackToHomeHeader.vue";
import MadeUpInputText from "@/components/utils/MadeUpInputText.vue";
import MadeUpButton from "@/components/utils/MadeUpButton.vue";
import ShieldCheckIcon from "vue-material-design-icons/ShieldCheck.vue";

export default {
  name: "Login",
  components: {
    BackToHomeHeader,
    MadeUpInputText,
    MadeUpButton,
    ShieldCheckIcon,
  },

  data() {
    return {
      email: "",
      password: "",
      recaptcha_token: "",
      loading: false,
      error: null,
    };
  },

  computed: {
    ...mapState("user", ["token"]),
  },

  methods: {
    ...mapActions("user", ["login"]),
    ...mapActions("comment", ["loadReportedComments"]),

    async recaptcha() {
      await this.$recaptchaLoaded();

      this.recaptcha_token = await this.$recaptcha("login");
    },

    async submitLogin() {
      if (this.loading) return;

      this.loading = true;

      await this.recaptcha();

      const params = {
        email: this.email,
        password: this.password,
        "g-recaptcha-response": this.recaptcha_token,
      };

      this.login(params).then(() => {
        if (this.token === null) {
          this.resetForm("Identifiants incorrects");
          return;
        }
        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        this.loadReportedComments();
        this.$router.push("/");
        this.resetForm();
      });
    },

    resetForm(error = null) {
      this.error = error;
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

.comment-submit-wrapper {
  display: flex;
  align-items: center;
}
.shield-icon {
  margin-left: 10px;
}

.error-wrapper {
  margin-top: 15px;
  height: 20px;
  color: var(--secondary-text-color);
}
</style>