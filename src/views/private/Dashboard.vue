<template>
  <div class="container dark-theme">
    <div>Dashboard</div>

    <div>
      <router-link to="/" @click="clearAlbums()">
        <button>Home</button>
      </router-link>
      <button @click="fetchLogout()">
        Déconnexion <span v-if="loadingLogout">loading...</span>
      </button>
    </div>

    <ReportList />

    <album-new />
    <album-list />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ReportList from "@/components/dashboard/ReportList.vue";
import AlbumNew from "@/components/dashboard/AlbumNew.vue";
import AlbumList from "@/components/dashboard/AlbumList.vue";

export default {
  name: "Dashboard",
  components: {
    ReportList,
    AlbumNew,
    AlbumList,
  },

  data() {
    return {
      loadingLogout: false,
    };
  },

  methods: {
    ...mapActions("user", ["logout"]),
    ...mapActions("album", ["clearAlbums"]),

    fetchLogout() {
      if (this.loadingLogout) return;

      this.loadingLogout = true;
      this.logout().then(() => {
        this.loadingLogout = false;
        this.$router.push("/admin");
      });
    },
  },
};
</script>