export const mutations = {
  SET_TEMPLATES_LIST(state, data) {
    state.TemplateList = data;
  },

  SPINER_LOAD(state) {
    state.Loading = true;
  },

  DELETE_TEMPLATE_ITEM(state, index) {
    state.TemplateList.splice(index, 1);
  }
};
