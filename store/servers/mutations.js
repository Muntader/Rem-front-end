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

  SET_DEFAULT_SERVER_TO_STORAGE(state, app) {
    const getServerUrl = this.$cookies.get("server-url");
    const getServerKey = this.$cookies.get("server-key");
    const getServerName = this.$cookies.get("server-name");
    if (getServerUrl == null) {
      // set in storage
      if (state.ServerList.length > 0) {
        this.$cookies.set("server-url", state.ServerList[0].domain);
        this.$cookies.set("server-key", state.ServerList[0].api_key);
        this.$cookies.set("server-name", state.ServerList[0].name);
      }
    }
  }
};
