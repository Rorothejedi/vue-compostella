<template>
  <transition name="modal">
    <div class="modal-wrapper" v-if="modelValue" @click.self="close()">
      <div class="modal-container">
        <header class="modal-header">
          <div class="modal-header-slot">
            <slot name="header"></slot>
          </div>
          <button class="modal-default-button" @click="close()">Fermer</button>
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
export default {
  name: "Modal",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],

  methods: {
    close() {
      this.$emit("update:modelValue", false); // previously was `this.$emit('input', title)`
    },
  },
};
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: var(--dark-bg-color);
  border-radius: 3px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
}

.modal-header-slot {
  display: flex;
  align-items: center;
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

/* utils */

.separator {
  background-color: var(--dark-text-color);
  width: 100%;
  height: 1px;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>