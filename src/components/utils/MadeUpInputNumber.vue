<template>
  <div class="made-up-input-number">
    <made-up-button
      v-if="stepper"
      class="stepper"
      small
      icon
      circle
      @mousedown="startLess()"
      @mouseup="stopLess()"
    >
      <minus-icon :size="18" />
    </made-up-button>
    <input
      type="number"
      :value="isNaN(modelValue) ? 0 : modelValue"
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
      v-if="stepper"
      class="stepper"
      small
      icon
      circle
      @mousedown="startMore()"
      @mouseup="stopMore()"
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

  data() {
    return {
      less_interval: null,
      more_interval: null,
    };
  },

  methods: {
    less() {
      if (this.modelValue === this.min) return;

      let calc = this.modelValue - parseFloat(this.step);
      calc = calc.toFixed(1);

      this.$emit("update:modelValue", parseFloat(calc));
    },
    startLess() {
      this.less();
      this.less_interval = setInterval(this.less, 1000 / 5);
    },
    stopLess() {
      clearInterval(this.less_interval);
    },

    more() {
      if (this.modelValue === this.max) return;

      let calc = this.modelValue + parseFloat(this.step);
      calc = calc.toFixed(1);

      this.$emit("update:modelValue", parseFloat(calc));
    },
    startMore() {
      this.more();
      this.more_interval = setInterval(this.more, 1000 / 5);
    },
    stopMore() {
      clearInterval(this.more_interval);
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