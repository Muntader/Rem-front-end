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
    commit("SPINER_LOAD", true);

    // Send request
    await this.$nodeServerApi.get("/api/templates").then(
      response => {
        if (response.status === 200) {
          commit("SET_TEMPLATES_LIST", response.data.data);
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

  async CREATE_TEMPLATE({ commit }, { Name, Description, Template }) {
    // Send request
    await this.$nodeServerApi
      .post("/api/templates/create", {
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

  async DELETE_TEMPLATE({ commit }, { ID, INDEX }) {
    // Send request
    await this.$nodeServerApi
      .delete("/api/templates/delete/" + ID)
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
  },


  async GET_TEMPLATE_EDIT({ commit }, ID) {
    await this.$nodeServerApi.get("/api/templates/edit/" + ID).then(
      response => {
        if (response.status === 200) {
          commit("SET_TEMPLATE_EDIT", response.data.data);
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

  async UPDATE_TEMPLATE({commit},{ ID, Name, Description, Template }) {
    // Send request
    await this.$nodeServerApi
      .post("/api/templates/update", {
        id: ID,
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
};
