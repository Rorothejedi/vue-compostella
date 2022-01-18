<template>
  <div>
    <form>
      <fieldset>
        <label for="date">Date : </label>
        <input
          v-model="date"
          id="date"
          type="date"
          :disabled="loading"
          required
        />

        <br /><br />

        <label for="place_departure">Ville de départ : </label>
        <input
          v-model="place_departure"
          placeholder="Ville de départ"
          id="place_departure"
          type="text"
          :disabled="loading"
          required
        />

        <br />

        <label for="place_arrival">Ville d'arrivé : </label>
        <input
          v-model="place_arrival"
          placeholder="Ville d'arrivé"
          id="place_arrival"
          type="text"
          :disabled="loading"
          required
        />

        <br /><br />

        <label for="km_step">Km étape : </label>
        <input
          v-model="km_step"
          placeholder="Kilomètres de l'étape"
          min="0"
          max="100"
          id="km_step"
          type="number"
          :disabled="loading"
          required
        />

        <br />

        <span>
          Km total parcouru :
          <strong v-if="!loading">
            {{ album.km_total - album.km_step + this.km_step }} km
          </strong>
        </span>

        <br /><br />

        <label for="text">Texte : </label>
        <br />
        <textarea
          v-model="text"
          placeholder="Texte"
          id="text"
          :disabled="loading"
          cols="50"
          rows="10"
        ></textarea>

        <br /><br />

        <button type="button" :disabled="loading" @click="updateAlbum()">
          Modifier <span v-if="loading_update">loading...</span>
        </button>
      </fieldset>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "AlbumEditForm",

  props: {
    loading: {
      type: Boolean,
      default: false,
      required: true,
    },
  },

  data() {
    return {
      loading_update: false,

      date: "",
      place_departure: "",
      place_arrival: "",
      km_step: 0,
      text: "",
    };
  },

  computed: {
    ...mapState("album", ["album"]),
  },

  watch: {
    loading(value) {
      if (!value) this.setAlbumValues();
    },
  },

  methods: {
    ...mapActions("album", ["editAlbum"]),

    updateAlbum() {
      if (this.loading_update) return;

      const { date, place_departure, place_arrival, km_step, text } = this;

      if (!date || !place_departure || !place_arrival || km_step < 0) {
        console.log("All data are needed");
        this.setAlbumValues();
        return;
      }

      this.loading_update = true;

      const params = { date, place_departure, place_arrival, km_step, text };

      this.editAlbum([this.$route.params.id, params]).then(() => {
        this.loading_update = false;
      });
    },

    setAlbumValues() {
      this.date = this.album.date;
      this.place_departure = this.album.place_departure;
      this.place_arrival = this.album.place_arrival;
      this.km_step = this.album.km_step;
      this.text = this.album.text;
    },
  },
};
</script>

<style scoped>
</style>