<template>
  <div>
    <p>Ajout d'un nouvel album</p>
    <ul>
      <li>depart ✔</li>
      <li>arrivé ✔</li>
      <li>date</li>
      <li>km total</li>
      <li>km étape</li>
      <li>texte ✔</li>
      <li>caché par défaut ✔</li>
      <li>photo principale</li>
      <li>les photos</li>
    </ul>

    <form>
      <input v-model="date" type="date" />
      <br />
      <input
        v-model="place_departure"
        type="text"
        placeholder="Ville de départ"
        required
      />
      <input
        v-model="place_arrival"
        type="text"
        placeholder="Ville d'arrivé"
        required
      />
      <br />
      <input
        v-model="km_step"
        type="number"
        placeholder="Kilomètres de l'étape"
        min="0"
        max="100"
        required
      />
      <input
        v-model="km_total"
        type="number"
        placeholder="Kilomètres totals"
        min="0"
        max="2000"
        disabled
      />
      <br />
      <textarea v-model="text" type="text" placeholder="Texte" required />
      <br />
      <button
        type="button"
        @click="addAlbum()"
        :disabled="this.albums[0] === undefined"
      >
        Ajouter <span v-if="loading">loading...</span>
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "AlbumNew",

  data() {
    return {
      text: null,
      date: "",
      place_departure: "",
      place_arrival: "",
      km_step: 0,

      loading: false,
    };
  },

  computed: {
    ...mapState("album", ["albums"]),

    km_total() {
      if (this.albums[0] === undefined) return 0;
      return this.albums[0].km_total + this.km_step;
    },
  },

  methods: {
    ...mapActions("album", ["createAlbum", "loadAlbums"]),

    addAlbum() {
      const { text, date, place_departure, place_arrival, km_step, km_total } =
        this;

      if (
        !text ||
        !date ||
        !place_departure ||
        !place_arrival ||
        !km_step ||
        !km_total
      ) {
        console.log("All data are needed");
        return;
      }

      if (this.loading) return;

      this.loading = true;

      const params = {
        text,
        date,
        place_departure,
        place_arrival,
        km_step,
        km_total,
      };

      this.createAlbum(params).then(() => {
        this.loadAlbums().then(() => {
          console.log("OK");

          this.text = "";
          this.date = null;
          this.place_departure = "";
          this.place_arrival = "";
          this.km_step = 0;
          this.loading = false;
        });
      });
    },
  },
};
</script>

<style scoped>
</style>