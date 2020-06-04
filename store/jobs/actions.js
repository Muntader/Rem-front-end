import router from "vue-router";

export const actions = {
  nuxtServerInit({ dispatch }) {
    return dispatch("GET_SERVER_LIST");
  },

  async GET_JOBS_LIST({ commit, app }) {
    // Start spinner load
    commit("SPINER_LOAD", true);

    console.log(this.$apiUrl.getServerUrl());

    return;
    // Send request
    await this.$axios
      .get(this.$apiUrl.getServerUrl(), {
        headers: {
          Authorization: "123"
        }
      })
      .then(
        response => {
          if (response.status === 200) {
            commit("SET_JOBS_LIST", response.data);
            commit("SPINER_LOAD", false);
          }
        },
        error => {
          if (error.response.status === 404) {
            this.$router.push({ name: "404" });
          } else {
            this.$router.push("/");
          }
        }
      );
  }
};
