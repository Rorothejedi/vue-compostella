<template>
  <div>
    <div
      class="overlay-resp-wrapper"
      :class="{ 'overlay-resp-active': resp_menu }"
    >
      <div class="overlay-resp-menu">
        <made-up-button
          @click="switchTheme()"
          icon
          large
          v-tooltip="'Thème sombre'"
          class="overlay-resp-menu-button"
        >
          <theme-light-dark-icon />
        </made-up-button>

        <router-link :to="'/legal'">
          <made-up-button icon large v-tooltip="'Mentions légales'">
            <scale-balance-icon />
          </made-up-button>
        </router-link>
      </div>
      <div class="path-line">
        <path-line v-if="resp_menu" />
      </div>
      <div class="overlay-resp-close-button">
        <made-up-button icon large @click="resp_menu = false">
          <close-icon />
        </made-up-button>
      </div>
    </div>

    <div class="path-line-wrapper">
      <div
        class="path-line"
        :style="`top: ${isAuthenticated ? '20px' : '50px'}`"
      >
        <path-line v-if="!resp_menu" />
      </div>
    </div>

    <div class="container home-container" v-if="!resp_menu">
      <div class="header">
        <div class="spacer"></div>

        <transition :name="first_view ? 'fade-1' : 'none'">
          <h1 class="title" v-if="isMount">Sur les chemins de Compostelle</h1>
        </transition>

        <div class="buttons-wrapper">
          <transition :name="first_view ? 'fade-2' : 'none'">
            <div v-if="isMount">
              <made-up-button
                @click="sortAlbums()"
                icon
                class="button"
                v-tooltip="'Trier les étapes'"
              >
                <sort-ascending-icon
                  v-if="albums_infinite_sort === 'asc'"
                  :size="18"
                />
                <sort-descending-icon v-else :size="18" />
              </made-up-button>
            </div>
          </transition>

          <transition
            :name="first_view ? 'fade-3' : 'none'"
            class="mobile-hidden"
          >
            <div v-if="isMount">
              <made-up-button
                @click="switchTheme()"
                icon
                class="button"
                v-tooltip="'Thème sombre'"
              >
                <theme-light-dark-icon />
              </made-up-button>
            </div>
          </transition>

          <transition
            :name="first_view ? 'fade-3' : 'none'"
            class="mobile-hidden"
          >
            <div v-if="isMount">
              <router-link :to="'/legal'">
                <made-up-button
                  icon
                  v-tooltip="'Mentions légales'"
                  class="button"
                >
                  <scale-balance-icon />
                </made-up-button>
              </router-link>
            </div>
          </transition>

          <transition
            :name="first_view ? 'fade-3' : 'none'"
            class="desktop-hidden"
          >
            <div v-if="isMount">
              <made-up-button icon v-tooltip="'Menu'" @click="switchRespMenu()">
                <menu-icon />
              </made-up-button>
            </div>
          </transition>
        </div>
      </div>

      <cover-list ref="cover_list" />
    </div>

    <back-to-top-button />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import CoverList from "@/components/home/CoverList.vue";
import PathLine from "@/components/home/PathLine.vue";
import BackToTopButton from "@/components/buttons/BackToTopButton.vue";
import MadeUpButton from "@/components/utils/MadeUpButton.vue";
import SortAscendingIcon from "vue-material-design-icons/SortAscending.vue";
import SortDescendingIcon from "vue-material-design-icons/SortDescending.vue";
import ThemeLightDarkIcon from "vue-material-design-icons/ThemeLightDark.vue";
import ScaleBalanceIcon from "vue-material-design-icons/ScaleBalance.vue";
import CloseIcon from "vue-material-design-icons/Close.vue";
import MenuIcon from "vue-material-design-icons/Menu.vue";
import store from "../store";

export default {
  name: "Home",
  components: {
    CoverList,
    PathLine,
    BackToTopButton,
    MadeUpButton,
    SortAscendingIcon,
    SortDescendingIcon,
    ThemeLightDarkIcon,
    ScaleBalanceIcon,
    MenuIcon,
    CloseIcon,
  },

  data() {
    return {
      isMount: false,
      resp_menu: false,
    };
  },

  computed: {
    ...mapState("nav", ["first_view"]),
    ...mapState("album", ["albums_infinite_sort"]),
    ...mapGetters(["isAuthenticated"]),
  },

  mounted() {
    this.isMount = true;
  },

  unmounted() {
    store.commit("nav/FIRST_VIEW_SEEN");
  },

  methods: {
    ...mapActions("album", ["sortAlbumsInfinite"]),

    sortAlbums() {
      this.sortAlbumsInfinite().then(() => {
        this.$refs.cover_list.page = 1;
        this.$refs.cover_list.fetchAlbums();
      });
    },

    switchTheme() {
      alert("switch theme");
    },

    switchRespMenu() {
      this.resp_menu = !this.resp_menu;
    },
  },
};
</script>

<style scoped>
.home-container {
  height: 70vh;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  font-size: 37px;
  font-family: "Londrina Outline", cursive;
  margin: 15px auto;
}
.buttons-wrapper {
  display: flex;
}
.button {
  margin-right: 3px;
}

/* Path line container behaviour */

.path-line {
  position: relative;
}
.path-line-wrapper {
  position: fixed;
  height: 100%;
  display: flex;
  justify-content: center;
  width: calc(50vw - 570px);
}

@media (max-width: 449px) {
  .buttons-wrapper {
    flex-direction: column;
  }
}

@media (max-width: 991px) {
  .path-line-wrapper {
    display: none;
  }
  .title {
    font-size: 32px;
  }
  .button {
    margin-bottom: 5px;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .path-line-wrapper {
    width: calc(50vw - 360px);
  }
}

@media (min-width: 1200px) and (max-width: 1600px) {
  .path-line-wrapper {
    width: calc(50vw - 480px);
  }
}

/* With full Pathline */

.overlay-resp-wrapper {
  padding-top: 40px;
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: -1;
  background-color: white;
  transition: all 0.3s ease;
}
.overlay-resp-active {
  opacity: 1;
  z-index: 2;
  transition: all 0.5s ease;
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

/* Helper responsive */
.mobile-hidden {
  display: block;
}

.desktop-hidden {
  display: none;
}

@media (max-width: 991px) {
  .mobile-hidden {
    display: none;
  }

  .desktop-hidden {
    display: block;
  }
}
</style>