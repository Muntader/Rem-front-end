import router from "vue-router";

export const actions = {
  // This function get cast details and cast  filmography
  /**
   * Get cast details and cast filmography
   *
   * @param {*} commit object
   * @param {*} id cast id
   */
  async GET_TEMPLATES_LIST({ commit }, id) {
    // Start spinner load
    commit("SPINER_LOAD");

    // Send request
    await this.$axios.get("http://localhost:3000/api/templates").then(
      response => {
        if (response.status === 200) {
          commit("SET_TEMPLATES_LIST", response.data.data);
          commit("SPINER_CLEAN");
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

  async DELETE_TEMPLATE({ commit }, { ID, INDEX }) {
    // Send request
    await this.$axios
      .delete("http://localhost:3000/api/templates/delete/" + ID)
      .then(
        response => {
          if (response.status === 200) {
            this.$toast.success(response.data.message, {
              position: "top-right",
              duration: 2000
            });

            commit("DELETE_TEMPLATE_ITEM", INDEX);
          }
        },
        error => {
          if (error.response.status === 404) {
            this.$router.push({ name: "404" });
          } else {
            this.$toast.error(error.response.data.message, {
              position: "top-right",
              duration: 2000
            });
          }
        }
      );
  }
};
