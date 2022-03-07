<template>
  <div>
    <div class="path-line-wrapper">
      <div class="path-line">
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
                title="Trier les albums"
                class="button"
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
              <made-up-button @click="switchTheme()" title="Theme sombre" icon>
                <theme-light-dark-icon />
              </made-up-button>
            </div>
          </transition>
        </div>
      </div>

      <cover-list ref="cover_list" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CoverList from "@/components/home/CoverList.vue";
import PathLine from "@/components/home/PathLine.vue";
import MadeUpButton from "@/components/utils/MadeUpButton.vue";
import SortAscendingIcon from "vue-material-design-icons/SortAscending.vue";
import SortDescendingIcon from "vue-material-design-icons/SortDescending.vue";
import ThemeLightDarkIcon from "vue-material-design-icons/ThemeLightDark.vue";
import store from "../store";

export default {
  name: "Home",
  components: {
    CoverList,
    PathLine,
    MadeUpButton,
    SortAscendingIcon,
    SortDescendingIcon,
    ThemeLightDarkIcon,
  },

  data() {
    return {
      isMount: false,
    };
  },

  computed: {
    ...mapState("nav", ["first_view"]),
    ...mapState("album", ["albums_infinite_sort"]),
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
  top: 50px;
}
.path-line-wrapper {
  position: fixed;
  height: 100%;
  display: flex;
  justify-content: center;
}

@media (min-width: 576px) and (max-width: 767px) {
  .path-line-wrapper {
    width: calc(50vw - 270px);
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .path-line-wrapper {
    width: calc(50vw - 360px);
  }
}

@media (min-width: 992px) and (max-width: 1600px) {
  .path-line-wrapper {
    width: calc(50vw - 480px);
  }
}

@media (min-width: 1601px) {
  .path-line-wrapper {
    width: calc(50vw - 570px);
  }
}
</style>