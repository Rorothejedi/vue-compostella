<template>
  <transition name="modal">
    <div class="modal-wrapper" v-if="modelValue" @click.self="close()">
      <div class="modal-container">
        <header class="modal-header">
          <div class="modal-header-slot">
            {{ title }}
          </div>
          <made-up-button @click="close()" icon circle small>
            <close-icon :size="18" />
          </made-up-button>
        </header>

        <div class="separator"></div>

        <main class="modal-body">
          <slot></slot>
        </main>

        <div class="separator"></div>

        <footer class="modal-footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import MadeUpButton from "@/components/utils/MadeUpButton.vue";
import CloseIcon from "vue-material-design-icons/Close.vue";

export default {
  name: "Modal",
  components: { MadeUpButton, CloseIcon },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],

  data() {
    return {
      scroll_y: 0,
    };
  },

  watch: {
    modelValue(value) {
      if (value) {
        this.scroll_y = window.scrollY;
        document.body.classList.add("show-modal");
        document.body.style.position = "fixed";
        document.body.style.top = `-${this.scroll_y}px`;
      } else {
        document.body.classList.remove("show-modal");
        document.body.style.position = "";
        document.body.style.top = "";
        window.scrollTo(0, this.scroll_y);
      }
    },
  },

  methods: {
    close() {
      this.$emit("update:modelValue", false);
    },
  },
};
</script>

<style>
.show-modal {
  overflow: hidden;
  width: -webkit-fill-available;
}
</style>

<style scoped>
.modal-wrapper {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  transition: opacity 0.3s ease;

  overflow: auto;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: var(--main-bg-color);
  border-radius: 3px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
}

.modal-header-slot {
  display: flex;
  align-items: center;
  font-family: var(--subtitle-font-family);
  font-weight: bold;
  font-size: large;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
}

/* utils */

.separator {
  background-color: grey;
  width: 100%;
  height: 1px;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>