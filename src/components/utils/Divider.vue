<template>
  <div :class="{ 'small-margin': smallMargin }">|</div>
</template>

<script>
export default {
  name: "Divider",

  props: {
    smallMargin: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
div {
  color: var(--third-text-color);
  cursor: default;
  margin-left: 30px;
  margin-right: 30px;
}

.small-margin {
  margin-left: 10px !important;
  margin-right: 10px !important;
}
</style>