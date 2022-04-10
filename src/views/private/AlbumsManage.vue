<template>
  <div class="container dark-theme">
    <div class="header">
      <album-sort />
      <album-new />
    </div>
    <album-list />
  </div>
</template>

<script>
import title from "@/mixins/title.js";
import AlbumSort from "@/components/albumsManage/AlbumSort.vue";
import AlbumNew from "@/components/albumsManage/AlbumNew.vue";
import AlbumList from "@/components/albumsManage/AlbumList.vue";

export default {
  name: "AlbumsManage",
  title: "Gestion des albums | Sur les chemins de Compostelle",
  mixins: [title],
  components: {
    AlbumSort,
    AlbumNew,
    AlbumList,
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px dashed gray;
}
</style>