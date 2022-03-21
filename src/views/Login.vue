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
import alert from "@/mixins/alert.js";
import BackToHomeHeader from "@/components/utils/BackToHomeHeader.vue";
import MadeUpInput from "@/components/utils/MadeUpInput.vue";
import MadeUpButton from "@/components/utils/MadeUpButton.vue";
import ShieldCheckIcon from "vue-material-design-icons/ShieldCheck.vue";

export default {
  name: "Login",
  mixins: [alert],
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
      recaptcha_token: "",
      loading: false,
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
        if (this.token === null) return this.errorLogin();

        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        this.loadReportedComments();
        this.$router.push("/");
        this.resetForm();
      });
    },

    errorLogin() {
      this.valid(
        {
          icon: "error",
          html: "Identifiants incorrects...<br/><br/><small><i>Ou peut-être êtes-vous un robot ?!</i></small>",
        },
        5000
      );
      this.resetForm();
      this.$nextTick(() => this.$refs.email.$el.focus());

      return;
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