<template>
  <div>
    <vue-picture-swipe
      :items="formattedItems"
      :options="options"
    ></vue-picture-swipe>
  </div>
</template>

// TODO
// 1 - Trouver une grid qui convienne
// 2 - Faire le thumbnail côté laravel
// 3 - Récupérer et stocker la w et h de chaque image avec laravel

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
        params.thumbnail = "http://via.placeholder.com/200x200";
        params.w = 900;
        params.h = 900;

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