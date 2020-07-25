export const mutations = {
  SET_TEMPLATES_LIST(state, data) {
    state.TemplateList = data;
  },

  SPINER_LOAD(state) {
    state.Loading = true;
  },

  SET_TEMPLATE_EDIT(state, data) {
    state.TemplateEdit = data;
  },

  DELETE_TEMPLATE_ITEM(state, index) {
    state.TemplateList.splice(index, 1);
  }
};
