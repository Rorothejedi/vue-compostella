<template>
  <div>
    <made-up-button @click="show_modal = true">Créer un album</made-up-button>

    <!-- Modal : Album create -->

    <modal v-model="show_modal" title="Ajouter un album">
      <template v-slot:default>
        <div class="form-input flex-form-input">
          <label for="date">Date : </label>
          <made-up-input
            v-model="date"
            type="date"
            id="date"
            :disabled="loading"
            :width="200"
          />
        </div>

        <div class="form-input">
          <div class="flex-form-input">
            <label for="place_departure">Ville de départ : </label>
            <made-up-input
              v-model="place_departure"
              id="place_departure"
              placeholder="ex: Toulon"
              :disabled="loading"
              :width="200"
            />
          </div>

          <div class="flex-form-input mt-1">
            <label for="place_arrival">Ville d'arrivée : </label>
            <made-up-input
              v-model="place_arrival"
              id="place_arrival"
              placeholder="ex: Santiago"
              :disabled="loading"
              :width="200"
            />
          </div>
        </div>

        <div class="form-input">
          <div class="flex-form-input">
            <label for="km_step">Km étape : </label>
            <!-- <input
              v-model="km_step"
              id="km_step"
              type="number"
              placeholder="Kilomètres de l'étape"
              min="0"
              max="100"
              step="0.1"
            /> -->
            <made-up-input-number
              v-model="km_step"
              id="km_step"
              placeholder="..."
              :disabled="loading"
              :width="50"
              :min="0"
              :max="100"
              stepper
            />
          </div>
          <div class="flex-form-input mt-1">
            <div>Km total parcouru jusqu'a cette étape:</div>
            <div v-if="albums.length > 0" class="bold">
              {{ total_km_traveled }} km
            </div>
          </div>
        </div>

        <div class="form-input">
          <label for="text">Texte : </label>
          <br />
          <made-up-textarea v-model="text" id="text" placeholder="ex: blabla" />
        </div>

        <div class="error">
          {{ error }}
        </div>
      </template>
      <template v-slot:footer>
        <made-up-button
          @click="addAlbum()"
          :loading="loading"
          :disabled="this.albums[0] === undefined"
          small
        >
          Ajouter
        </made-up-button>

        <made-up-button @click="resetLocalState()" small>
          Annuler
        </made-up-button>
      </template>
    </modal>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Modal from "@/components/utils/Modal.vue";
import MadeUpButton from "@/components/utils/MadeUpButton.vue";
import MadeUpInput from "@/components/utils/MadeUpInput.vue";
import MadeUpInputNumber from "@/components/utils/MadeUpInputNumber.vue";
import MadeUpTextarea from "@/components/utils/MadeUpTextarea.vue";

export default {
  name: "AlbumNew",
  components: {
    Modal,
    MadeUpButton,
    MadeUpTextarea,
    MadeUpInput,
    MadeUpInputNumber,
  },

  data() {
    return {
      text: null,
      date: "",
      place_departure: "",
      place_arrival: "",
      km_step: 0,
      error: null,

      loading: false,
      show_modal: false,
    };
  },

  computed: {
    ...mapState("album", ["albums", "albums_meta"]),

    total_km_traveled() {
      if (this.albums[0] === undefined) return 0;

      const result = this.albums[0].km_total_max + this.km_step;

      return Math.round(result * 10) / 10;
    },
  },

  methods: {
    ...mapActions("album", ["createAlbum", "loadAlbums"]),

    async addAlbum() {
      if (this.loading) return;

      const { text, date, place_departure, place_arrival, km_step } = this;

      if (!date) {
        this.error = "Le champ 'date' est requis";
        return;
      }
      if (!place_departure) {
        this.error = "Le champ 'ville de départ' est requis";
        return;
      }
      if (!place_arrival) {
        this.error = "Le champ 'ville d'arrivé' est requis";
        return;
      }
      if (km_step < 0) {
        this.error = "Le champ 'km étape' doit être supérieur ou égal à 0";
        return;
      }

      this.loading = true;
      this.error = null;

      const params = {
        text,
        date,
        place_departure,
        place_arrival,
        km_step,
      };

      await this.createAlbum(params);
      await this.loadAlbums({ per_page: this.albums_meta.per_page });

      this.resetLocalState();
      this.loading = false;
    },

    resetLocalState() {
      this.text = "";
      this.date = null;
      this.place_departure = "";
      this.place_arrival = "";
      this.km_step = 0;
      this.error = null;
      this.show_modal = false;
    },
  },
};
</script>

<style scoped>
/* Modal content */
.form-input {
  margin-bottom: 20px;
}
.mt-1 {
  margin-top: 4px;
}
.flex-form-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.error {
  color: var(--secondary-text-color);
}
</style>