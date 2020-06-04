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

  async CREATE_TEMPLATE({ commit }, { Name, Description, Template }) {
    // Send request
    await this.$axios
      .post("http://localhost:3000/api/templates/create", {
        name: Name,
        description: Description,
        template: Template
      })
      .then(
        response => {
          if (response.status === 200) {
            this.$toast.success(response.data.message, {
              position: "top-right",
              duration: 2000
            });

            this.$router.push({ name: "template-manage" });
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

  async GET_SERVER_EDIT({ commit }, ID) {
    commit("SPINER_LOAD", true);
    await this.$axios.get("http://localhost:3000/api/servers/edit/" + ID).then(
      response => {
        if (response.status === 200) {
          commit("SET_SERVER_EDIT", response.data.data);
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

  async UPDATE_SERVER({ commit }, { ID, Name, ApiKey, Domain }) {
    // Send request
    await this.$axios
      .post("http://localhost:3000/api/servers/update", {
        id: ID,
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
