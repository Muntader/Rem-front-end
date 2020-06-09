export const actions = {
  async nuxtServerInit({ dispatch }) {
    return dispatch("GET_SERVER_LIST");
  },

  async GET_JOBS_LIST({ commit }, url) {
    // Start spinner load
    commit("SPINER_LOAD", true);
    // Send request
    await this.$api.get(url).then(
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
  },

  UPLOAD_VIDEOS_TO_SERVER({ commit }, { data, config }) {
    this.$axios
      .post("http://localhost:8080/api/v1/upload", data, config)
      .then(res => {
        commit("DELETE_UPLOAD_LIST", {
          uid: uid
        });
        console.log("Success Upload");
      })
      .catch(err => {
        commit("DELETE_UPLOAD_LIST", {
          uid: uid
        });
      });
  }
};
