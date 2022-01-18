<template>
  <div class="home">
    <div class="container">
      <h1 class="title">Sur les chemins de Compostelle</h1>
      <div class="wrapper">
        <cover-list />
      </div>
    </div>
  </div>
</template>

<script>
import CoverList from "@/components/home/CoverList.vue";

export default {
  name: "Home",
  components: { CoverList },
};
</script>

<style scoped>
/* title */
.title {
  font-size: 40px;
  padding: 3px 0;
  font-family: "Londrina Outline", cursive;
}

/*wrapper */
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
}

@media (max-width: 767px) {
  .wrapper {
    grid-template-columns: repeat(1, 1fr);
  }
}
@media (min-width: 768px) and (max-width: 1199px) {
  .wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>