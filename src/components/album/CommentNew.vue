<template>
  <div>
    <title-line title="Poster un commentaire" />

    <div class="comment-new">
      <label for="author">Votre nom</label><br />
      <made-up-input
        v-model="author"
        type="text"
        id="author"
        :placeholder="`ex: ${authorPlaceholder}`"
        :disabled="loading"
        maxlength="30"
        large
      />

      <br />
      <small>{{ 30 - author.length }} restant</small>

      <br /><br />

      <label for="text">Votre commentaire</label><br />
      <made-up-textarea
        v-model="text"
        id="text"
        placeholder="ex: blabla"
        :disabled="loading"
      />

      <br /><br />

      <div class="comment-submit-wrapper">
        <div
          v-tooltip="
            !canPublished
              ? 'Vous devez remplir les champs ci-dessus pour pouvoir poster un commentaire'
              : ''
          "
        >
          <made-up-button
            :loading="loading"
            :disabled="!canPublished"
            @click="postComment()"
            color="grey"
          >
            Poster le commentaire
          </made-up-button>
        </div>

        <shield-check-icon
          class="shield-icon"
          v-tooltip.right="'Protégé avec Google reCAPTCHA v3'"
          fillColor="#aaa"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import alert from "@/mixins/alert.js";
import recaptcha from "@/mixins/recaptcha.js";
import TitleLine from "@/components/utils/TitleLine.vue";
import MadeUpButton from "@/components/utils/MadeUpButton.vue";
import MadeUpInput from "@/components/utils/MadeUpInput.vue";
import MadeUpTextarea from "@/components/utils/MadeUpTextarea.vue";
import ShieldCheckIcon from "vue-material-design-icons/ShieldCheck.vue";

export default {
  name: "CommentNew",
  mixins: [alert, recaptcha],
  components: {
    TitleLine,
    MadeUpButton,
    MadeUpInput,
    MadeUpTextarea,
    ShieldCheckIcon,
  },

  data() {
    return {
      loading: false,
      author: "",
      text: "",
      authorPlaceholder: "",
    };
  },

  computed: {
    canPublished() {
      const regexp = /^\s+$/; // without only spaces

      if (regexp.test(this.author) || regexp.test(this.text)) return false;

      return this.author !== "" && this.text !== "";
    },
  },

  mounted() {
    this.randomAuthorPlaceholder();
  },

  errorCaptured() {
    if (this.loading) this.loading = false;

    this.valid(
      {
        icon: "error",
        html: "Une erreur s'est produite...<br />Merci de vérifier que les informations sont correctement remplies.<br/><br/><small><i>Ou peut-être êtes-vous un robot ?!</i></small>",
      },
      6000
    );

    return false;
  },

  methods: {
    ...mapActions("comment", ["createComment"]),
    ...mapActions("album", ["loadAlbum"]),

    async postComment() {
      if (this.loading) return;

      this.loading = true;

      await this.recaptcha();

      const params = {
        album_id: this.$route.params.id,
        author: this.author,
        text: this.text,
        "g-recaptcha-response": this.recaptcha_token,
      };

      await this.createComment(params);
      await this.loadAlbum(this.$route.params.id);

      this.author = "";
      this.text = "";
      this.loading = false;

      this.valid({
        icon: "success",
        html: "Votre commentaire a été posté avec succès !<br />Merci de votre participation !",
      });

      this.randomAuthorPlaceholder();
    },

    randomAuthorPlaceholder() {
      const famous_characters = [
        "Katniss Everdeen",
        "Beatrix Kiddo",
        "Sarah Connor",
        "Ellen Ripley",
        "Mercredi Addams",
        "Imperator Furiosa",
        "Leia Organa",
        "Lara Croft",
        "Barbara Gordon",
        "O-Ren Ishii",
        "Hermione Granger",
        "Claire Bennet",
        "Lisa Simpson",
        "Sansa Stark",
        "Elena Fisher",
        "Tifa Lockhart",

        "John McClane",
        "Korben Dallas",
        "Bear Grylls",
        "Mike Horn",
        "Sheldon Cooper",
        "Vincent Vega",
        "John Rambo",
        "Ramsay Bolton",
        "James Crochet",
        "Ronon Dex",
        "Charles Xavier",
        "Mia Wallace",
        "Mr Blonde",
        "Aldo Raine",
        "Kyle Broflovski",
        "Barney Stinson",
        "Johnny Rico",
        "Thomas Anderson",
      ];

      const random_index = Math.floor(Math.random() * famous_characters.length);

      this.authorPlaceholder = famous_characters[random_index];
    },
  },
};
</script>

<style scoped>
.comment-new {
  margin-top: 60px;
  padding: 25px;
  border-radius: 4px;
  border: 1px dashed var(--third-text-color);
}

label {
  font-family: var(--subtitle-font-family);
}

#author,
#text {
  margin-top: 10px;
}

.comment-submit-wrapper {
  display: flex;
  align-items: center;
}

.shield-icon {
  margin-left: 10px;
}
</style>