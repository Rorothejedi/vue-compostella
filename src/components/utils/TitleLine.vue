<template>
  <div>
    <h2>
      <span>{{ title }}</span>
    </h2>
  </div>
</template>

<script>
export default {
  name: "TitleLine",
  props: {
    title: {
      type: String,
      required: true,
      default: "",
    },
  },
};
</script>

<style scoped>
h2 {
  width: 100%;
  text-align: center;
  border-bottom: 1px solid var(--third-text-color);
  line-height: 0.1em;
  margin: 75px 0 60px 0;
  font-family: var(--title-font-family-solid);
  font-weight: 400;
}
span {
  padding: 0 30px;
  background-color: var(--main-bg-color);
}
</style>