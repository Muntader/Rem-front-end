import router from "vue-router";

export const actions = {
  // This function get cast details and cast  filmography
  /**
   * Get cast details and cast filmography
   *
   * @param {*} commit object
   * @param {*} id cast id
   */
  async GET_SERVER_LIST({ commit }) {
    // Start spinner load
    commit("SPINER_LOAD", true);

    // Send request
    await this.$nodeServerApi.get("/api/servers").then(
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

  async CREATE_SERVER({}, { Name, ApiKey, Domain, CloudDomain }) {
    // Send reques
    console.log({
      name: Name,
      api_key: ApiKey,
      domain: Domain,
      cloud_domain: CloudDomain
    });
    await this.$nodeServerApi
      .post("/api/servers/create", {
        name: Name,
        api_key: ApiKey,
        domain: Domain,
        cloud_domain: CloudDomain
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

  async GET_SERVER_EDIT({ commit }, ID) {
    commit("SPINER_LOAD", true);
    await this.$nodeServerApi.get("/api/servers/edit/" + ID).then(
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

  async UPDATE_SERVER({ ID, Name, ApiKey, Domain, CloudDomain }) {
    // Send request
    await this.$nodeServerApi
      .post("/api/servers/update", {
        id: ID,
        name: Name,
        api_key: ApiKey,
        domain: Domain,
        cloud_domain: CloudDomain
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

  async DELETE_SERVER({ commit }, { ID, INDEX }) {
    // Send request
    await this.$nodeServerApi.delete("/api/servers/delete/" + ID).then(
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
