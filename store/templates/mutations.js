export const mutations = {
  SET_TEMPLATES_LIST(state, data) {
    state.TemplateList = data;
  },

  SPINER_LOAD(state) {
    state.Loading = true;
  },

  SPINER_CLEAN(state) {
    state.Loading = false;
  }
};
