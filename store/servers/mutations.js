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
  }
};
