<template>
  <div>
    <TitleLine title="Nouvel album" dark />

    <form>
      <fieldset>
        <label for="date">Date : </label>
        <input v-model="date" id="date" type="date" />

        <br /><br />

        <label for="place_departure">Ville de départ : </label>
        <input
          v-model="place_departure"
          id="place_departure"
          type="text"
          placeholder="ex: Toulon"
          required
        />

        <br />

        <label for="place_arrival">Ville d'arrivé : </label>
        <input
          v-model="place_arrival"
          id="place_arrival"
          type="text"
          placeholder="ex: Cahors"
          required
        />

        <br /><br />

        <label for="km_step">Km étape : </label>
        <input
          v-model="km_step"
          id="km_step"
          type="number"
          placeholder="Kilomètres de l'étape"
          min="0"
          max="100"
          required
        />

        <br />

        <span>
          Km total parcouru jusqu'a cette étape:
          <strong v-if="albums.length > 0">
            {{ albums[0].km_total_max + km_step }} km
          </strong>
        </span>

        <br /><br />

        <label for="text">Texte : </label>
        <br />
        <textarea
          v-model="text"
          id="text"
          type="text"
          placeholder="ex: blabla"
        />

        <p>Ajouter aussi les photos dont photo principale</p>

        <button
          type="button"
          @click="addAlbum()"
          :disabled="this.albums[0] === undefined"
        >
          Ajouter <span v-if="loading">loading...</span>
        </button>
      </fieldset>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import TitleLine from "@/components/utils/TitleLine.vue";

export default {
  name: "AlbumNew",
  components: { TitleLine },

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
        !date ||
        !place_departure ||
        !place_arrival ||
        km_step < 0 ||
        !km_total
      ) {
        console.log("All data are needed");
        this.resetLocalState();
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
          this.resetLocalState();
          this.loading = false;
        });
      });
    },

    resetLocalState() {
      this.text = "";
      this.date = null;
      this.place_departure = "";
      this.place_arrival = "";
      this.km_step = 0;
    },
  },
};
</script>

<style scoped>
</style>