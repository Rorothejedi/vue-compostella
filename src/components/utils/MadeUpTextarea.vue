<template>
  <textarea
    :value="modelValue"
    @input="(event) => $emit('update:modelValue', event.target.value)"
    :placeholder="placeholder"
    :disabled="disabled"
    :style="`min-height: ${height}px`"
  ></textarea>
</template>

<script>
export default {
  name: "MadeUpTextarea",
  props: {
    modelValue: {
      type: String,
      // required: true,
    },
    placeholder: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    height: {
      type: Number,
      required: false,
      default: 200,
    },
  },
};
</script>

<style scoped>
textarea {
  width: calc(100% - 20px);
  resize: vertical;
  padding: 10px 10px;
  background-color: var(--grey-color);
  border: 0px;
  border-radius: 2px;
  outline: none;
  transition: background-color 0.3s ease;
}
textarea:focus {
  background-color: rgb(235, 217, 217);
  transition: background-color 0.3s ease;
}
textarea:disabled {
  background-color: rgb(250, 250, 250);
}
textarea:disabled::placeholder {
  color: rgba(3, 3, 3, 0.35);
}
</style>