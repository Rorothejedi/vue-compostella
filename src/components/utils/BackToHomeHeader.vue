<template>
  <div class="header">
    <router-link to="/" class="back" title="Retour à l'accueil">
      <made-up-button icon large>
        <arrow-left-icon />
      </made-up-button>
    </router-link>
    <divider />
    <span class="title">
      {{ title }}
    </span>
  </div>
</template>

<script>
import MadeUpButton from "@/components/utils/MadeUpButton.vue";
import ArrowLeftIcon from "vue-material-design-icons/ArrowLeft.vue";
import Divider from "@/components/utils/Divider.vue";

export default {
  name: "BackToHomeHeader",
  components: {
    MadeUpButton,
    ArrowLeftIcon,
    Divider,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 80px;
}
.title {
  font-family: var(--subtitle-font-family);
  font-weight: 400;
  font-size: 25px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>