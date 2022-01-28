<template>
  <div class="container">
    <div class="header">
      <div>
        <router-link to="/" class="back">
          <made-up-button icon large>
            <arrow-left-icon />
          </made-up-button>
        </router-link>
        <transition-group name="fade">
          <divider v-if="!loading" />
          <h2 v-if="!loading" class="places">
            Etape du {{ formatDate(album.date) }}
          </h2>
        </transition-group>
      </div>
      <div>
        <router-link
          v-if="this.isAuthenticated"
          :to="`/album-edit/${album.id}`"
        >
          <button>Gérer l'album</button>
        </router-link>
      </div>
    </div>

    <kilometers-line :loading="loading" :album="album" />

    <transition name="fade-1">
      <p class="story" v-if="!loading">
        {{ album.text }}
      </p>
    </transition>

    <transition-group name="fade-2">
      <gallery :images="album.images" v-if="!loading" />
      <comment-list :comments="album.comments" v-if="!loading" />
      <comment-new v-if="!loading" />
    </transition-group>
  </div>
</template>

<script>
import MadeUpButton from "@/components/utils/MadeUpButton.vue";
import ArrowLeftIcon from "vue-material-design-icons/ArrowLeft.vue";
import date from "@/mixins/date.js";
import { mapActions, mapGetters, mapState } from "vuex";
import Divider from "@/components/utils/Divider.vue";
import KilometersLine from "@/components/album/KilometersLine.vue";
import Gallery from "@/components/album/Gallery.vue";
import CommentList from "@/components/album/CommentList.vue";
import CommentNew from "@/components/album/CommentNew.vue";

export default {
  name: "Album",
  components: {
    MadeUpButton,
    ArrowLeftIcon,
    Divider,
    KilometersLine,
    Gallery,
    CommentList,
    CommentNew,
  },
  mixins: [date],

  data() {
    return {
      loading: true,
    };
  },

  computed: {
    ...mapGetters(["isAuthenticated"]),
    ...mapState("album", ["album"]),
  },

  mounted() {
    this.fetchAlbum();
  },

  unmounted() {
    this.clearAlbum();
  },

  methods: {
    ...mapActions("album", ["loadAlbum", "clearAlbum"]),

    fetchAlbum() {
      this.loading = true;

      this.loadAlbum(this.$route.params.id).then(() => {
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}
.header div:first-child {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.back {
  text-decoration: none;
}
.places {
  font-family: var(--subtitle-font-family);
  font-weight: 400;
  font-size: 25px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.story {
  font-size: 18px;
  line-height: 30px;
  letter-spacing: 0.3px;
  margin-top: 70px;
  margin-bottom: 70px;
  white-space: pre-wrap;
}
.story::first-letter {
  text-transform: uppercase;
  font-size: 2.5em;
  font-weight: bold;
}
</style>
