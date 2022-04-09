<template>
  <div class="wrapper">
    <div class="wrapper-input">
      <label for="date">Date : </label>
      <made-up-input v-model="date" type="date" id="date" :disabled="loading" />
    </div>

    <br />

    <div class="wrapper-input">
      <label for="place_departure">Ville de départ : </label>
      <made-up-input
        v-model="place_departure"
        placeholder="ex: Toulon"
        id="place_departure"
        :disabled="loading"
      />
    </div>

    <div class="wrapper-input">
      <label for="place_arrival">Ville d'arrivée : </label>
      <made-up-input
        v-model="place_arrival"
        placeholder="ex: Santiago"
        id="place_arrival"
        :disabled="loading"
      />
    </div>

    <br />

    <div class="wrapper-input">
      <label for="km_step">Km étape : </label>
      <made-up-input-number
        v-model="km_step"
        placeholder="Kilomètres de l'étape"
        id="km_step"
        :disabled="loading"
        :min="0"
        :max="100"
        stepper
      />
    </div>

    <div class="wrapper-input">
      <div class="km-total-label">Km total parcouru :</div>
      <div>
        <strong v-if="!loading" class="km-total">
          {{ total_km_traveled }}
          km
        </strong>
      </div>
    </div>

    <br />

    <div>
      <label for="text">Texte : </label>
      <made-up-textarea
        v-model="text"
        placeholder="ex: blabla"
        id="text"
        :disabled="loading"
        :height="300"
      />
    </div>

    <br />

    <div>
      <made-up-button
        :disabled="loading"
        @click="confirmUpdateAlbum()"
        :loading="loading_update"
        small
      >
        Modifier
      </made-up-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import alert from "@/mixins/alert.js";
import MadeUpInput from "@/components/utils/MadeUpInput.vue";
import MadeUpInputNumber from "@/components/utils/MadeUpInputNumber.vue";
import MadeUpTextarea from "@/components/utils/MadeUpTextarea.vue";
import MadeUpButton from "@/components/utils/MadeUpButton.vue";

export default {
  name: "AlbumEditForm",
  mixins: [alert],
  components: {
    MadeUpInput,
    MadeUpInputNumber,
    MadeUpTextarea,
    MadeUpButton,
  },
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

    total_km_traveled() {
      const result =
        parseFloat(this.album.km_total) -
        parseFloat(this.album.km_step) +
        parseFloat(this.km_step);

      return Math.round(result * 10) / 10;
    },
  },

  watch: {
    loading(value) {
      if (!value) this.setAlbumValues();
    },
  },

  mounted() {
    if (
      !this.loading &&
      (this.place_departure === "" ||
        this.place_arrival === "" ||
        this.date === "" ||
        this.km_step === 0)
    )
      this.setAlbumValues();
  },

  methods: {
    ...mapActions("album", [
      "editAlbum",
      "loadAlbums",
      "clearAlbumsInfinite",
      "clearAlbumsSimple",
    ]),

    async confirmUpdateAlbum() {
      if (this.loading_update) return;

      let options = {
        icon: "warning",
        html: `Voulez-vous modifier les informations de l'album ?`,
        confirmButtonText: "Modifier",
      };

      if (!(await this.confirm(options))) return;

      this.updateAlbum();
    },

    async updateAlbum() {
      const { date, place_departure, place_arrival, km_step, text } = this;

      if (!date || !place_departure || !place_arrival || km_step < 0) {
        this.valid({
          icon: "error",
          html: "Les informations renseignées sont incorrects.",
        });
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
      if (!isHide) await this.clearAlbumsSimple();

      this.loading_update = false;

      this.valid({
        icon: "success",
        html: "Les informations de l'album ont été mises à jour avec succès !",
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
.wrapper {
  border: 1px dashed grey;
  border-radius: 4px;
  padding: 20px;
  margin-top: 10px;
}
.wrapper-input {
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
label {
  width: 300px;
}
.km-total-label {
  width: 500px;
}

.km-total {
  font-family: var(--subtitle-font-family);
  border-bottom: 1px solid grey;
}
.step {
  margin: auto 2px;
}
</style>