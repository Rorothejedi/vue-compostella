<template>
  <div>
    <h2 v-if="video.title !== ''">{{ video.title }}</h2>
    <div class="player">
      <iframe
        :src="`https://www.youtube-nocookie.com/embed/${video.link}?color=white&modestbranding=0&rel=0`"
        title="Lecteur vidéo YouTube"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoPlayer",
  props: {
    video: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.player {
  position: relative;
  overflow: hidden;
  padding-bottom: 56.25%;
  height: 0;
}
.player iframe {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>