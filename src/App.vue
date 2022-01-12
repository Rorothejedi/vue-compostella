<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition || 'fade'" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

//     testDarkTheme() {
//       console.log("is dark", this.$attrs);
//       document.body.style.backgroundColor = this.$attrs.darkTheme
//         ? "red"
//         : "black";
//     },
//   },

<style>
@import "./styles/normalize.css";
@import "./styles/main.css";
</style>
