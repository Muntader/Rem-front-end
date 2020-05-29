export const mutations = {
  SET_SERVER_LIST(state, data) {
    state.ServerList = data;
  },

  SPINER_LOAD(state, s) {
    state.Loading = s;
  },

  DELETE_SERVER_ITEM(state, index) {
    state.ServerList.splice(index, 1);
  }
};
