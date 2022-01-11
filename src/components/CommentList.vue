<template>
  <div>
    <h4>Commentaires</h4>
    <p v-for="(comment, key) in comments" :key="key">
      {{ comment }}
    </p>
  </div>
</template>

<script>
export default {
  name: "CommentList",
  props: {
    comments: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>

<style scoped>
</style>