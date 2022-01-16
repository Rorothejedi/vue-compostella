<template>
  <div class="container dark-theme">
    <p>Modifier un album existant (avec suppression)</p>

    <router-link to="/dashboard" @click="clearAlbum()">
      <button>Retour</button>
    </router-link>

    <br /><br />

    <div v-if="!loading">
      <p v-if="album.created_at !== album.updated_at">
        Dernière modification le {{ formatDatetime(album.updated_at) }}
      </p>
      <p>Créer le {{ formatDatetime(album.created_at) }}</p>
      <p>
        Visible: <strong>{{ album.hide ? "Non " : "Oui " }}</strong>
        <switch-visibility-button :album="album" />
      </p>
      <p>
        Supprimer :
        <delete-button :album="album" />
      </p>
    </div>

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
          Km total parcouru jusqu'a cette étape:
          <strong v-if="!loading"
            >{{ album.km_total - album.km_step + this.km_step }} km</strong
          ></span
        >

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

    <images-manage v-if="!loading" :album="album" />

    <br />

    <p v-if="loading">Loading...</p>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import date from "@/mixins/date.js";
import SwitchVisibilityButton from "@/components/edit/SwitchVisibilityButton.vue";
import DeleteButton from "@/components/edit/DeleteButton.vue";
import ImagesManage from "@/components/edit/ImagesManage.vue";

export default {
  name: "AlbumEdit",
  components: { SwitchVisibilityButton, DeleteButton, ImagesManage },
  mixins: [date],

  data() {
    return {
      loading: false,
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

  mounted() {
    this.fetchAlbum();
  },

  methods: {
    ...mapActions("album", [
      "loadAlbum",
      "loadAlbums",
      "clearAlbum",
      "editAlbum",
    ]),

    fetchAlbum() {
      this.loading = true;
      this.loadAlbum(this.$route.params.id).then(() => {
        this.setLocalStateWithStore();

        this.loading = false;
      });
    },

    updateAlbum() {
      if (this.loading_update) return;

      const { date, place_departure, place_arrival, km_step, text } = this;

      if (!date || !place_departure || !place_arrival || km_step < 0) {
        console.log("All data are needed");
        this.setLocalStateWithStore();
        return;
      }

      this.loading_update = true;

      const params = { date, place_departure, place_arrival, km_step, text };

      this.editAlbum([this.$route.params.id, params]).then(() => {
        this.loading_update = false;
      });
    },

    setLocalStateWithStore() {
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