<template>
  <button
    type="button"
    :class="{
      flat: flat,
      large: large,
      big: big,
      small: small,
      icon: icon,
      circle: circle,
      loading: loading,
      disabled: disabled,
    }"
    :disabled="disabled"
    :style="[
      color && !disabled ? `color: ${color}` : '',
      secondaryBgColor
        ? 'background-color: var(--secondary-text-color); color: white;'
        : '',
    ]"
  >
    <span v-if="!loading">
      <slot></slot>
    </span>
    <div v-else class="loading-wrapper">
      <sync-icon v-if="color" class="loading-icon" :fillColor="color" />
      <sync-icon v-else class="loading-icon" />
    </div>
  </button>
</template>

<script>
import SyncIcon from "vue-material-design-icons/Sync.vue";

export default {
  name: "MadeButton",
  components: { SyncIcon },
  props: {
    flat: {
      type: Boolean,
      required: false,
      default: false,
    },
    large: {
      type: Boolean,
      required: false,
      default: false,
    },
    big: {
      type: Boolean,
      required: false,
      default: false,
    },
    small: {
      type: Boolean,
      required: false,
      default: false,
    },
    icon: {
      type: Boolean,
      required: false,
      default: false,
    },
    circle: {
      type: Boolean,
      required: false,
      default: false,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    color: {
      type: String,
      required: false,
      default: "",
    },
    secondaryBgColor: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style>
body {
  --button-bg-color: #efefef;
  --button-bg-hv-color: #e2e2e2;
}
body.dark-theme {
  --button-bg-color: #3f3f3f;
  --button-bg-hv-color: #4f4f4f;
}
</style>

<style scoped>
/* Common for button */
button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  border-radius: 4px;
  border-style: none;
  outline: 0;
  cursor: pointer;
  text-decoration: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  height: 36px;
  min-width: 64px;
  padding: 0 16px;
  color: var(--main-text-color);
  background-color: var(--button-bg-color);
  transition: background-color 0.2s cubic-bezier(0.4, 0, 0.6, 1);
}
button:hover:not(.loading):not(.disabled) {
  transition: background-color 0.2s cubic-bezier(0.4, 0, 0.6, 1);
  background-color: var(--button-bg-hv-color);
}
button:active:not(.loading):not(.disabled) {
  transition: background-color 0.05s cubic-bezier(0.4, 0, 0.6, 1);
  background-color: var(--button-bg-hv-color);
  filter: brightness(95%);
}

/* Flat (no background) */
.flat {
  background-color: initial !important;
}

/* Large size */
.large {
  height: 44px;
  min-width: 78px;
  padding: 0 19.5555555556px;
}
.large.icon {
  height: 44px;
  width: 44px;
}

/* Big size (very large) */
.big {
  height: 56px;
  min-width: 78px;
  padding: 0 19.5555555556px;
}
.big.icon {
  height: 56px;
  width: 56px;
}

/* Small size */
.small {
  height: 28px;
  min-width: 50px;
  padding: 0 12.4444444444px;
}
.small.icon {
  height: 28px;
  width: 28px;
}

/* Circle */
.circle {
  height: 36px;
  width: 36px;
  min-height: 0;
  min-width: 0;
  padding: 0;
  border-radius: 50%;
}
.circle.small {
  height: 28px;
  width: 28px;
}

/* Loading */
.loading {
  cursor: initial;
}
.loading-wrapper {
  animation: spin 2s infinite linear;
}
.loading-icon {
  display: flex;
}

/* Icon */
.icon {
  height: 36px;
  width: 36px;
  min-height: 0;
  min-width: 0;
  padding: 0;
  border-radius: 50%;
}
.icon span {
  display: flex;
  justify-content: center;
}

/* Disabled */
.disabled {
  cursor: not-allowed;
  opacity: 0.3;
}
</style>

<style>
/* Fix material deign icons */
button span .material-design-icon {
  display: flex;
}
</style>