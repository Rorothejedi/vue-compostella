<template>
  <div>
    <h4>Galerie photo</h4>
    <p v-for="(image, key) in images" :key="key">
      {{ image }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Gallery",
  props: {
    images: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>

<style scoped>
</style>