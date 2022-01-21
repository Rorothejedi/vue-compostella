<template>
  <div class="container dark-theme">
    <album-new />
    <hr />
    <album-list />
  </div>
</template>

<script>
import AlbumNew from "@/components/albumsManage/AlbumNew.vue";
import AlbumList from "@/components/albumsManage/AlbumList.vue";

export default {
  name: "AlbumsManage",
  components: {
    AlbumNew,
    AlbumList,
  },
};
</script>