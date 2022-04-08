<template>
  <div class="made-up-input-number">
    <made-up-button
      small
      icon
      circle
      @click="less()"
      class="stepper"
      v-if="stepper"
    >
      <minus-icon :size="18" />
    </made-up-button>
    <input
      type="number"
      :value="modelValue"
      @input="
        (event) => $emit('update:modelValue', parseFloat(event.target.value))
      "
      :placeholder="placeholder"
      :disabled="disabled"
      :min="min"
      :max="max"
      :style="`width: ${width}px`"
      :step="step"
    />
    <made-up-button
      small
      icon
      circle
      @click="more()"
      class="stepper"
      v-if="stepper"
    >
      <plus-icon :size="18" />
    </made-up-button>
  </div>
</template>

<script>
import MadeUpButton from "@/components/utils/MadeUpButton.vue";
import MinusIcon from "vue-material-design-icons/Minus.vue";
import PlusIcon from "vue-material-design-icons/Plus.vue";

export default {
  name: "MadeUpInputNumber",
  components: { MadeUpButton, MinusIcon, PlusIcon },
  props: {
    modelValue: {
      type: Number,
      required: false,
      default: 0,
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
    step: {
      type: String,
      required: false,
      default: "0.1",
    },
    stepper: {
      type: Boolean,
      required: false,
    },
  },

  methods: {
    less() {
      if (this.modelValue === this.min) return;

      let calc = this.modelValue - parseFloat(this.step);
      calc = calc.toFixed(1);

      this.$emit("update:modelValue", parseFloat(calc));
    },

    more() {
      if (this.modelValue === this.max) return;

      let calc = this.modelValue + parseFloat(this.step);
      calc = calc.toFixed(1);

      this.$emit("update:modelValue", parseFloat(calc));
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

.made-up-input-number {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.stepper {
  margin: auto 2px;
}
</style>