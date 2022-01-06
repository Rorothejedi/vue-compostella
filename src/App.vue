<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition || 'fade'" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

/* Route transition */
.slide-right-enter-from,
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
.slide-right-enter-active,
.slide-left-enter-active {
  transition: all 0.3s ease-out;
}
.slide-right-leave-to,
.slide-left-enter-from {
  opacity: 0;
  transform: translateX(-100px);
}
.slide-right-leave-active,
.slide-left-leave-active {
  transition: all 0.3s ease-in;
}

/* Container style */
html {
  margin: 0;
}
.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 150px;
}
@media (min-width: 576px) and (max-width: 767px) {
  .container {
    width: 540px;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .container {
    width: 720px;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .container {
    width: 960px;
  }
}
@media (min-width: 1200px) and (max-width: 1399px) {
  .container {
    width: 1140px;
  }
}
@media (min-width: 1400px) {
  .container {
    width: 1320px;
  }
}
</style>
