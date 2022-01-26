<template>
  <div>
    <vue-picture-swipe
      :items="formattedItems"
      :options="options"
      :key="width"
    ></vue-picture-swipe>
  </div>
</template>

<script>
import VuePictureSwipe from "@/components/utils/VuePictureSwipe.vue";

export default {
  name: "Gallery",
  components: { VuePictureSwipe },
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
        history: false,
      },
      width: 0,
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

  mounted() {
    this.width = document.body.offsetWidth;
    window.addEventListener("resize", this.resizeJustifiedGallery);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.resizeJustifiedGallery);
  },

  methods: {
    resizeJustifiedGallery() {
      this.width = document.body.offsetWidth;
    },
  },
};
</script>

<style scoped>
</style>