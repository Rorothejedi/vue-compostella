<template>
  <!-- <kinesis-background> -->
  <div class="container">
    <router-link to="/album/23">test</router-link>

    <h1 class="title">Sur les chemins de Compostelle</h1>
    <cover-list />
  </div>

  <!-- </kinesis-background> -->
</template>

<script>
import CoverList from "@/components/home/CoverList.vue";
// import KinesisBackground from "@/components/home/KinesisBackground.vue";

export default {
  name: "Home",
  components: {
    // KinesisBackground,
    CoverList,
  },
};
</script>

<style scoped>
.title {
  font-size: 40px;
  padding: 3px 0;
  font-family: "Londrina Outline", cursive;
}
</style>