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

        <label for="place_arrival">Ville d'arrivée : </label>
        <input
          v-model="place_arrival"
          placeholder="Ville d'arrivée"
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
    ...mapState("album", ["album", "albums_meta", "albums_sort"]),
  },

  watch: {
    loading(value) {
      if (!value) this.setAlbumValues();
    },
  },

  methods: {
    ...mapActions("album", ["editAlbum", "loadAlbums", "clearAlbumsInfinite"]),

    async updateAlbum() {
      if (this.loading_update) return;

      const { date, place_departure, place_arrival, km_step, text } = this;

      if (!date) this.error = "Le champ 'date' est requis";
      if (!place_departure)
        this.error = "Le champ 'ville de départ' est requis";
      if (!place_arrival) this.error = "Le champ 'ville d'arrivé' est requis";
      if (km_step < 0)
        this.error = "Le champ 'km étape' doit être supérieur ou égal à 0";
      if (!date || !place_departure || !place_arrival || km_step < 0) {
        this.setAlbumValues();
        return;
      }

      this.loading_update = true;

      const edit_params = {
        date,
        place_departure,
        place_arrival,
        km_step,
        text,
      };
      const load_params = {
        page: this.albums_meta.current_page,
        per_page: this.albums_meta.per_page,
        sort_by: this.albums_sort,
      };

      const isHide = this.album.hide;

      await this.editAlbum([this.$route.params.id, edit_params]);
      await this.loadAlbums(load_params);

      if (!isHide) await this.clearAlbumsInfinite();

      this.loading_update = false;
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