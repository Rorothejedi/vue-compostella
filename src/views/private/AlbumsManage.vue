<template>
  <div class="container dark-theme">
    <album-new />
    <album-list />
  </div>
</template>

<script>
import AlbumNew from "@/components/dashboard/AlbumNew.vue";
import AlbumList from "@/components/dashboard/AlbumList.vue";

export default {
  name: "AlbumsManage",
  components: {
    AlbumNew,
    AlbumList,
  },
};
</script>