<template>
  <div class="comment-new">
    <label for="author">Votre nom *</label><br />
    <input
      v-model="author"
      id="author"
      type="text"
      :placeholder="`ex: ${randomAuthorName}`"
    />

    <br /><br />

    <label for="text">Votre commentaire *</label><br />
    <textarea v-model="text" id="text"></textarea>

    <br /><br />

    <button type="button" :disabled="!canPublished" @click="postComment()">
      Envoyer <span v-if="loading">loading...</span>
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "CommentNew",

  data() {
    return {
      loading: false,
      author: "",
      text: "",
    };
  },

  computed: {
    canPublished() {
      return this.author !== "" && this.text !== "" && !this.loading;
    },
    randomAuthorName() {
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

      return famous_characters[
        Math.floor(Math.random() * famous_characters.length)
      ];
    },
  },

  methods: {
    ...mapActions("comment", ["createComment"]),
    ...mapActions("album", ["loadAlbum"]),

    postComment() {
      if (this.loading) return;

      this.loading = true;

      const params = {
        album_id: this.$route.params.id,
        author: this.author,
        text: this.text,
      };

      this.createComment(params).then(() => {
        this.loadAlbum(this.$route.params.id).then(() => {
          this.author = "";
          this.text = "";
          this.loading = false;
        });
      });
    },
  },
};
</script>

<style scoped>
.comment-new {
  background-color: whitesmoke;
  padding: 25px;
  border-radius: 3px;
}
</style>