<template>
  <transition name="modal">
    <div class="modal-mask" v-if="modelValue">
      <div class="modal-wrapper" @click.self="close()">
        <div class="modal-container">
          <header class="modal-header">
            <slot name="header"> default header </slot>
          </header>

          <hr />

          <main class="modal-body">
            <slot></slot>
          </main>

          <footer class="modal-footer">
            <slot name="footer">
              default footer
              <button class="modal-default-button" @click="close()">
                Close
              </button>
            </slot>
          </footer>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  props: {
    modelValue: Boolean,
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
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
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
</style>