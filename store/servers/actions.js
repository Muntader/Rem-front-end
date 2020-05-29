import router from "vue-router";

export const actions = {
  // This function get cast details and cast  filmography
  /**
   * Get cast details and cast filmography
   *
   * @param {*} commit object
   * @param {*} id cast id
   */
  async GET_SERVER_LIST({ commit }, id) {
    // Start spinner load
    commit("SPINER_LOAD", true);

    // Send request
    await this.$axios.get("http://localhost:3000/api/servers").then(
      response => {
        if (response.status === 200) {
          commit("SET_SERVER_LIST", response.data.data);
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

  async CREATE_SERVER({ commit }, { Name, ApiKey, Domain }) {
    // Send request
    await this.$axios
      .post("http://localhost:3000/api/servers/create", {
        name: Name,
        api_key: ApiKey,
        domain: Domain
      })
      .then(
        response => {
          if (response.status === 200) {
            this.$toast.success(response.data.message, {
              position: "top-right",
              duration: 2000
            });

            this.$router.push({ name: "settings-servers" });
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
  },

  async DELETE_SERVER({ commit, state }, { ID, INDEX }) {
    // Send request
    await this.$axios
      .delete("http://localhost:3000/api/servers/delete/" + ID)
      .then(
        response => {
          if (response.status === 200) {
            this.$toast.success(response.data.message, {
              position: "top-right",
              duration: 2000
            });

            commit("DELETE_SERVER_ITEM", INDEX);
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
