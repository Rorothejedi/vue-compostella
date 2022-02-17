<template>
  <div>
    <made-up-button @click="show_modal = true">Créer un album</made-up-button>

    <!-- Modal : Album create -->

    <modal v-model="show_modal" title="Ajouter un album">
      <template v-slot:default>
        <div class="form-input flex-form-input">
          <label for="date">Date : </label>
          <input v-model="date" id="date" type="date" />
        </div>

        <div class="form-input">
          <div class="flex-form-input">
            <label for="place_departure">Ville de départ : </label>
            <input
              v-model="place_departure"
              id="place_departure"
              type="text"
              placeholder="ex: Toulon"
            />
          </div>

          <div class="flex-form-input mt-1">
            <label for="place_arrival">Ville d'arrivée : </label>
            <input
              v-model="place_arrival"
              id="place_arrival"
              type="text"
              placeholder="ex: Cahors"
            />
          </div>
        </div>

        <div class="form-input">
          <div class="flex-form-input">
            <label for="km_step">Km étape : </label>
            <input
              v-model="km_step"
              id="km_step"
              type="number"
              placeholder="Kilomètres de l'étape"
              min="0"
              max="100"
            />
          </div>
          <div class="flex-form-input mt-1">
            <div>Km total parcouru jusqu'a cette étape:</div>
            <div v-if="albums.length > 0" class="bold">
              {{ albums[0].km_total_max + km_step }} km
            </div>
          </div>
        </div>

        <div class="form-input">
          <label for="text">Texte : </label>
          <br />
          <textarea
            v-model="text"
            id="text"
            type="text"
            placeholder="ex: blabla"
          />
        </div>
      </template>
      <template v-slot:footer>
        <div class="footer-buttons">
          <button
            type="button"
            @click="addAlbum()"
            :disabled="this.albums[0] === undefined"
          >
            Ajouter <span v-if="loading">loading...</span>
          </button>
          <button type="button" @click="resetLocalState()">Annuler</button>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Modal from "@/components/utils/Modal.vue";
import MadeUpButton from "@/components/utils/MadeUpButton.vue";

export default {
  name: "AlbumNew",
  components: { Modal, MadeUpButton },

  data() {
    return {
      text: null,
      date: "",
      place_departure: "",
      place_arrival: "",
      km_step: 0,

      loading: false,
      show_modal: false,
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
      const { text, date, place_departure, place_arrival, km_step } = this;

      if (!date || !place_departure || !place_arrival || km_step < 0) {
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
      };

      this.createAlbum(params).then(() => {
        this.loadAlbums({ per_page: 15 }).then(() => {
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
}
textarea {
  width: 98.5%;
  height: 100px;
}

/* Modal footer */
.footer-buttons {
  display: flex;
  justify-content: space-between;
}
</style>