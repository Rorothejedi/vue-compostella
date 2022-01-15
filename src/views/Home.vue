<template>
  <div class="home">
    <div class="container">
      <h1 class="title">Sur les chemins de Compostelle</h1>
      <!-- TODO Remove after dev-->
      <router-link to="/dashboard">
        <button @click="clearAlbums()">Dashboard admin</button>
      </router-link>
      <br /><br />

      <!-- <svg
        class="svg-line"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="612px"
        height="200px"
        viewBox="500 0 500 400"
        xml:space="preserve"
      >
        <path
          class="path"
          fill="none"
          stroke="#000000"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          d="M25.560537338256836,211.65919494628906C65.51569426854451,207.21973139444987,163.42301664352416,200.1046282450358,243.4977569580078,187.44393920898438C323.57249727249143,174.78325017293295,395.5755002339681,131.25559972127277,462.33184814453125,142.60089111328125C529.0881960550944,153.94618250528973,548.1016133626302,244.39460983276368,607.623291015625,249.3273468017578C667.1449686686198,254.26008377075195,754.1106313069662,184.14050903320313,786.9955444335938,169.50672912597656"
        />

        <path
          class="dashed"
          fill="none"
          stroke="white"
          stroke-width="4"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          d="M25.560537338256836,211.65919494628906C65.51569426854451,207.21973139444987,163.42301664352416,200.1046282450358,243.4977569580078,187.44393920898438C323.57249727249143,174.78325017293295,395.5755002339681,131.25559972127277,462.33184814453125,142.60089111328125C529.0881960550944,153.94618250528973,548.1016133626302,244.39460983276368,607.623291015625,249.3273468017578C667.1449686686198,254.26008377075195,754.1106313069662,184.14050903320313,786.9955444335938,169.50672912597656"
        />
      </svg> -->

      <div class="wrapper">
        <CoverList />
      </div>
    </div>
  </div>
</template>

<script>
import CoverList from "@/components/home/CoverList.vue";
import { mapActions } from "vuex";

export default {
  name: "Home",
  components: { CoverList },

  methods: {
    ...mapActions("album", ["clearAlbums"]),
  },
};
</script>

<style scoped>
/* title */
.title {
  font-size: 40px;
  padding: 3px 0;
  font-family: "Londrina Outline", cursive;
}

/* svg line (a voir si je garde) */
/* .dashed {
  stroke-dasharray: 10;
}
.path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: dash 5s linear alternate infinite;
}

@keyframes dash {
  from {
    stroke-dashoffset: 1000;
  }
  to {
    stroke-dashoffset: 0;
  }
} */

/*wrapper */
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
}

@media (max-width: 767px) {
  .wrapper {
    grid-template-columns: repeat(1, 1fr);
  }
}
@media (min-width: 768px) and (max-width: 1199px) {
  .wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>