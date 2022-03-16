<template>
  <input
    :value="modelValue"
    @input="(event) => $emit('update:modelValue', event.target.value)"
    type="text"
    :maxlength="maxLength"
    :placeholder="placeholder"
    :disabled="disabled"
    :class="!fullWidthMobile ? 'calculated-width-mobile' : ''"
  />
</template>

<script>
export default {
  name: "MadeUpInputText",
  props: {
    modelValue: {
      type: String,
      required: true,
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
  },
};
</script>

<style scoped>
input {
  margin-top: 10px;

  width: 300px;
  height: 25px;
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

/* Responsive for mobile */
@media (max-width: 480px) {
  .calculated-width-mobile {
    width: calc(100% - 20px);
  }
}
</style>