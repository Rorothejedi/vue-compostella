<template>
  <div class="home">
    <div class="container">
      <h1>Sur les chemins de Compostelle</h1>

      <hr />
      <br />

      <div class="wrapper">
        <CoverList />
      </div>
    </div>
  </div>
</template>

<script>
import CoverList from "@/components/CoverList.vue";

export default {
  name: "Home",
  components: { CoverList },
};
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 380px;
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