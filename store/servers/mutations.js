export const mutations = {
  SET_SERVER_LIST(state, data) {
    state.ServerList = data;
  },

  SET_SERVER_EDIT(state, data) {
    state.ServerEdit = data;
  },

  SPINER_LOAD(state, s) {
    state.Loading = s;
  },

  DELETE_SERVER_ITEM(state, index) {
    state.ServerList.splice(index, 1);
  },

  SET_DEFAULT_SERVER_TO_STORAGE(state, data) {
    if (process.browser) {
      const getServerUrl = localStorage.getItem("server-url");
      const getServerKey = localStorage.getItem("server-key");
      const getServerName = localStorage.getItem("server-name");
      if (getServerUrl == null) {
        // set in storage
        if (state.ServerList.length > 0) {
          localStorage.setItem("server-url", state.ServerList[0].domain);
          localStorage.setItem("server-key", state.ServerList[0].api_key);
          localStorage.setItem("server-name", state.ServerList[0].name);
        } else {
          this.$toast.info("Add server from settings", {
            position: "top-right",
            duration: 2000
          });
        }
      } else {
        state.ServerActive.domain = getServerUrl;
        state.ServerActive.key = getServerKey;
        state.ServerActive.Name = getServerName;
      }
    }
  }
};
