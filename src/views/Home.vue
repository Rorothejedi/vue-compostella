<template>
  <div>
    <div class="path-line-wrapper" v-if="!resp_menu">
      <div
        class="path-line"
        :style="`top: ${isAuthenticated ? '20px' : '40px'}`"
      >
        <path-line @save-top="saveTop()" />
      </div>
    </div>

    <div class="container home-container">
      <div class="header">
        <div class="spacer"></div>

        <transition :name="first_view ? 'transition-title' : 'none'">
          <h1 class="title" v-if="isMount">Sur les chemins de Compostelle</h1>
        </transition>

        <div class="buttons-wrapper">
          <transition :name="first_view ? 'transition-button-1' : 'none'">
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
            :name="first_view ? 'transition-button-2' : 'none'"
            class="mobile-hidden"
          >
            <div v-if="isMount">
              <made-up-button
                @click="switchTheme()"
                icon
                class="button"
                v-tooltip="dark ? 'Thème clair' : 'Thème sombre'"
              >
                <theme-light-dark-icon />
              </made-up-button>
            </div>
          </transition>

          <transition
            :name="first_view ? 'transition-button-3' : 'none'"
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
        </div>
      </div>

      <cover-list ref="cover_list" @save-top="saveTop()" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import title from "@/mixins/title.js";
import utils from "@/mixins/utils.js";
import CoverList from "@/components/home/CoverList.vue";
import PathLine from "@/components/home/PathLine.vue";
import MadeUpButton from "@/components/utils/MadeUpButton.vue";
import SortAscendingIcon from "vue-material-design-icons/SortAscending.vue";
import SortDescendingIcon from "vue-material-design-icons/SortDescending.vue";
import ThemeLightDarkIcon from "vue-material-design-icons/ThemeLightDark.vue";
import ScaleBalanceIcon from "vue-material-design-icons/ScaleBalance.vue";

export default {
  name: "Home",
  title: "Sur les chemins de Compostelle",
  mixins: [title, utils],
  components: {
    CoverList,
    PathLine,
    MadeUpButton,
    SortAscendingIcon,
    SortDescendingIcon,
    ThemeLightDarkIcon,
    ScaleBalanceIcon,
  },

  data() {
    return {
      isMount: false,
    };
  },

  computed: {
    ...mapState("theme", ["dark"]),
    ...mapState("nav", ["first_view", "top_home", "resp_menu"]),
    ...mapState("album", ["albums_infinite", "albums_infinite_sort"]),
    ...mapGetters(["isAuthenticated"]),
  },

  async created() {
    await this.$nextTick();

    window.scrollTo({ top: this.top_home });
  },

  mounted() {
    this.isMount = true;
  },

  unmounted() {
    this.firstViewSeen();
  },

  methods: {
    ...mapActions("theme", ["switchDarkTheme"]),
    ...mapActions("album", ["sortAlbumsInfinite"]),
    ...mapActions("nav", ["firstViewSeen", "changeTopHome"]),

    async sortAlbums() {
      const albums_count =
        this.albums_infinite.length >= 12 ? 12 : this.albums_infinite.length;
      const sleep_time = (albums_count + 3) * 80;

      await this.sortAlbumsInfinite();
      await this.sleep(sleep_time);

      this.$refs.cover_list.page = 1;
      this.$refs.cover_list.fetchAlbums();
    },

    switchTheme() {
      this.switchDarkTheme();
      document.body.classList.toggle("dark-theme");
    },

    saveTop() {
      this.changeTopHome(window.scrollY);
    },
  },
};
</script>

<style scoped>
.home-container {
  min-height: 70vh;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  font-size: 37px;
  font-family: var(--title-font-family-outline);
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
  position: sticky;
  position: -webkit-sticky;
  top: 0px;
  height: 0px;
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
    width: calc(48vw - 360px);
  }
}

@media (min-width: 1200px) and (max-width: 1600px) {
  .path-line-wrapper {
    width: calc(48vw - 480px);
  }
}

/* Fixed helper */

.fixed {
  position: fixed;
}
@media (min-width: 577px) and (max-width: 991px) {
  .fixed {
    left: 50%;
    transform: translateX(-50%);
  }
}

/* Helper responsive */
.mobile-hidden {
  display: block;
}

@media (max-width: 991px) {
  .mobile-hidden {
    display: none;
  }
}

/* Transition */

.transition-title-enter-active {
  transition: all 2s ease 0.3s;
}
.transition-button-1-enter-active {
  transition: all 0.5s ease 1s;
}
.transition-button-2-enter-active {
  transition: all 0.5s ease 1.2s;
}
.transition-button-3-enter-active {
  transition: all 0.5s ease 1.4s;
}

.transition-title-enter-from {
  opacity: 0;
}
.transition-button-1-enter-from,
.transition-button-2-enter-from,
.transition-button-3-enter-from {
  opacity: 0;
  transform: translateY(-25px);
}
</style>