<template>
  <div v-if="displayed">
    <transition name="slide-top">
      <made-up-button
        v-if="!changing_page"
        icon
        big
        secondaryBgColor
        @click="saveTop(), switchRespMenu()"
        class="fixed_button"
      >
        <menu-icon />
      </made-up-button>
    </transition>

    <transition name="transition-resp-menu">
      <div v-if="big_resp_menu" class="overlay-resp-wrapper">
        <div class="overlay-resp-menu">
          <transition name="transition-resp-button-1" appear>
            <made-up-button
              v-if="resp_menu"
              @click="switchTheme()"
              icon
              large
              v-tooltip="dark ? 'Thème clair' : 'Thème sombre'"
              class="overlay-resp-menu-button"
            >
              <theme-light-dark-icon />
            </made-up-button>
          </transition>

          <transition name="transition-resp-button-2" appear>
            <router-link
              :to="'/legal'"
              v-if="resp_menu"
              @click="switchRespMenu()"
            >
              <made-up-button icon large v-tooltip="'Mentions légales'">
                <scale-balance-icon />
              </made-up-button>
            </router-link>
          </transition>
        </div>
        <transition name="transition-resp-path-line" appear>
          <div class="path-line" v-if="resp_menu">
            <path-line @click="switchRespMenu()" />
          </div>
        </transition>
        <transition name="transition-resp-close-button" appear>
          <div class="overlay-resp-close-button" v-if="resp_menu">
            <made-up-button icon large @click="switchRespMenu()">
              <close-icon />
            </made-up-button>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import utils from "@/mixins/utils.js";
import MadeUpButton from "@/components/utils/MadeUpButton.vue";
import PathLine from "@/components/home/PathLine.vue";
import ThemeLightDarkIcon from "vue-material-design-icons/ThemeLightDark.vue";
import ScaleBalanceIcon from "vue-material-design-icons/ScaleBalance.vue";
import CloseIcon from "vue-material-design-icons/Close.vue";
import MenuIcon from "vue-material-design-icons/Menu.vue";

export default {
  name: "RespMenu",
  mixins: [utils],
  components: {
    MadeUpButton,
    PathLine,
    ThemeLightDarkIcon,
    ScaleBalanceIcon,
    CloseIcon,
    MenuIcon,
  },

  data() {
    return {
      changing_page: false,
      big_resp_menu: false,
      window_width: window.innerWidth,
    };
  },

  computed: {
    ...mapState("theme", ["dark"]),
    ...mapState("nav", ["top_home", "resp_menu"]),

    displayed() {
      return (
        this.window_width < 992 &&
        (this.$route.name === "home" ||
          this.$route.name === "album" ||
          this.$route.name === "legal")
      );
    },
  },

  watch: {
    async $route() {
      this.changing_page = true;

      await this.sleep(1500);

      this.changing_page = false;
    },

    async resp_menu(value) {
      if (!value) await this.sleep(200);
      this.big_resp_menu = value;

      if (value) await this.sleep(400);
      document.getElementsByClassName("container")[0].classList.toggle("fixed");

      if (!value) {
        await this.$nextTick();
        window.scrollTo({ top: this.top_home });
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    ...mapActions("theme", ["switchDarkTheme"]),
    ...mapActions("nav", ["changeTopHome", "switchRespMenu"]),

    switchTheme() {
      this.switchDarkTheme();
      document.body.classList.toggle("dark-theme");
    },

    saveTop() {
      this.changeTopHome(window.scrollY);
    },

    onResize() {
      this.window_width = window.innerWidth;
    },
  },
};
</script>

<style scoped>
.fixed_button {
  position: fixed;
  bottom: 15px;
  right: 25px;
  z-index: 998;
}

.path-line {
  position: relative;
}

.overlay-resp-wrapper {
  padding-top: 40px;
  top: 0px;
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  z-index: 999;
  background-color: var(--main-bg-color);
  transition: all 0.3s ease-in;
}

.overlay-resp-close-button {
  position: absolute;
  top: 30px;
  right: 30px;
}
.overlay-resp-menu {
  position: absolute;
  top: 30px;
  left: 30px;
  display: flex;
  flex-direction: column;
}
.overlay-resp-menu-button {
  margin-bottom: 10px;
}

/* Transition button */

.slide-top-enter-from,
.slide-top-leave-to {
  opacity: 0;
}

.slide-top-enter-active {
  transition: all 0.3s ease-out;
}
.slide-top-leave-active {
  transition: all 0.3s ease-in;
}

/* Transition menu */

.transition-resp-button-1-enter-active {
  transition: all 0.5s ease 0.2s;
}
.transition-resp-button-1-leave-active {
  transition: all 0.3s ease;
}

.transition-resp-button-2-enter-active {
  transition: all 0.5s ease 0.3s;
}
.transition-resp-button-2-leave-active {
  transition: all 0.3s ease;
}

.transition-resp-close-button-enter-active {
  transition: all 0.5s ease 0.2s;
}
.transition-resp-close-button-leave-active {
  transition: all 0.3s ease;
}

.transition-resp-path-line-enter-active {
  transition: all 0.5s ease 0.2s;
}
.transition-resp-path-line-leave-active {
  transition: all 0.3s ease;
}

.transition-resp-button-1-enter-from,
.transition-resp-button-1-leave-to,
.transition-resp-button-2-enter-from,
.transition-resp-button-2-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
.transition-resp-close-button-enter-from,
.transition-resp-close-button-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
.transition-resp-path-line-enter-from,
.transition-resp-path-line-leave-to {
  opacity: 0;
  transform: translateY(50px);
}

.transition-resp-menu-enter-active {
  transition: all 0.3s ease;
}
.transition-resp-menu-leave-active {
  transition: all 0.3s ease 0.2s;
}
.transition-resp-menu-enter-from,
.transition-resp-menu-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
</style>