<template>
  <div>
    <div class="path-line-wrapper">
      <div
        class="path-line"
        :style="`top: ${isAuthenticated ? '20px' : '50px'}`"
      >
        <path-line />
      </div>
    </div>

    <div class="container">
      <div class="header">
        <div></div>

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

          <transition :name="first_view ? 'fade-3' : 'none'">
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

          <transition :name="first_view ? 'fade-3' : 'none'">
            <div v-if="isMount">
              <router-link :to="'/legal'">
                <made-up-button icon v-tooltip="'Mentions légales'">
                  <scale-balance-icon />
                </made-up-button>
              </router-link>
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
  },

  data() {
    return {
      isMount: false,
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
  },
};
</script>

<style scoped>
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

@media (max-width: 991px) {
  .path-line-wrapper {
    display: none;
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
</style>