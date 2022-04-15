<template>
  <div class="back-to-top-wrapper">
    <transition name="slide-top">
      <div v-if="!changing_page && scroll_y > 600">
        <made-up-button
          @click="backToTopScroll()"
          icon
          large
          title="Retour haut de page"
        >
          <arrow-collapse-up-icon :size="20" />
        </made-up-button>
      </div>
    </transition>
  </div>
</template>

<script>
import MadeUpButton from "@/components/utils/MadeUpButton.vue";
import ArrowCollapseUpIcon from "vue-material-design-icons/ArrowCollapseUp.vue";

import utils from "@/mixins/utils.js";

export default {
  name: "BackToTopButton",
  mixins: [utils],
  components: {
    MadeUpButton,
    ArrowCollapseUpIcon,
  },

  data() {
    return {
      scroll_timer: 0,
      scroll_y: 0,
      changing_page: false,
    };
  },

  watch: {
    async $route() {
      this.changing_page = true;

      await this.sleep(500);

      this.changing_page = false;
    },
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    backToTopScroll() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    handleScroll() {
      if (this.scroll_timer) return;

      this.scroll_timer = setTimeout(() => {
        this.scroll_y = window.scrollY;
        clearTimeout(this.scroll_timer);
        this.scroll_timer = 0;
      }, 100);
    },
  },
};
</script>

<style scoped>
.back-to-top-wrapper {
  position: fixed;
  bottom: calc(50vh - 22px);
  right: calc(calc(calc(50vw - 570px) / 2) - 22px);
}

@media (min-width: 992px) and (max-width: 1199px) {
  .back-to-top-wrapper {
    right: calc(calc(calc(50vw - 360px) / 2) - 22px);
  }
}

@media (min-width: 1200px) and (max-width: 1600px) {
  .back-to-top-wrapper {
    right: calc(calc(calc(50vw - 480px) / 2) - 22px);
  }
}

/* Transition 'slide-top' */

.slide-top-enter-from {
  opacity: 0;
  transform: translateY(50px);
}
.slide-top-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}

.slide-top-enter-active {
  transition: all 0.3s ease-out;
}
.slide-top-leave-active {
  transition: all 0.3s ease-in;
}
</style>