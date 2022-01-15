import moment from "moment";

export default {
  created() {
    this.moment = moment;
  },

  methods: {
    formatDate(date) {
      return this.moment(date).locale("fr").format('LL');
    },
    formatDatetime(date) {
      return this.moment(date).locale("fr").format("LL à HH:mm");
    }
  }
}