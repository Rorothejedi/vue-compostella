<template>
  <div>
    <vue-picture-swipe
      :items="formattedItems"
      :options="options"
    ></vue-picture-swipe>
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

  data() {
    return {
      options: {
        shareEl: false,
      },
    };
  },

  computed: {
    formattedItems() {
      let items = [];

      items = this.images.map((image) => {
        let params = {};

        params.src = process.env.VUE_APP_BASE_URL + "/" + image.path;
        params.thumbnail =
          process.env.VUE_APP_BASE_URL + "/" + image.thumbnail_path;
        params.w = image.width;
        params.h = image.height;

        if (image.text !== null) params.title = image.text;

        return params;
      });

      return items;
    },
  },
};
</script>

<style scoped>
</style>