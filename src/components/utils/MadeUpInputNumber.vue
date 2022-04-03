<template>
  <input
    type="number"
    :value="modelValue"
    @input="(event) => $emit('update:modelValue', parseInt(event.target.value))"
    :placeholder="placeholder"
    :disabled="disabled"
    :min="min"
    :max="max"
    :style="`width: ${width}px`"
  />
</template>

<script>
export default {
  name: "MadeUpInputNumber",
  props: {
    modelValue: {
      type: Number,
      required: false,
    },
    min: {
      type: Number,
      required: false,
    },
    max: {
      type: Number,
      required: false,
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
    width: {
      type: Number,
      required: false,
      default: 160,
    },
  },
};
</script>

<style scoped>
input {
  height: 20px;
  border: 0px;
  border-radius: 2px;
  padding: 5px 10px;
  background-color: var(--grey-color);
  outline: none;
  transition: background-color 0.3s ease;
}
input:focus {
  background-color: rgb(235, 217, 217);
  transition: background-color 0.3s ease;
}
input:disabled {
  background-color: rgb(250, 250, 250);
}
input:disabled::placeholder {
  color: rgba(3, 3, 3, 0.35);
}
</style>