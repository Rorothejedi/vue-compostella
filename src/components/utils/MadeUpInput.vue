<template>
  <input
    :value="modelValue"
    @input="(event) => $emit('update:modelValue', event.target.value)"
    :maxlength="maxLength"
    :placeholder="placeholder"
    :disabled="disabled"
    :style="`width: ${width}px`"
    :class="{
      large: large,
      'calculated-width-mobile': !fullWidthMobile,
    }"
  />
</template>

<script>
export default {
  name: "MadeUpInput",
  props: {
    modelValue: {
      type: String,
      required: false,
    },
    maxLength: {
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
    fullWidthMobile: {
      type: Boolean,
      required: false,
      default: false,
    },
    width: {
      type: Number,
      required: false,
      default: 300,
    },
    large: {
      type: Boolean,
      required: false,
      default: false,
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

.large {
  height: 25px;
}

/* Responsive for mobile */
@media (max-width: 480px) {
  .calculated-width-mobile {
    width: calc(100% - 20px) !important;
  }
}
</style>