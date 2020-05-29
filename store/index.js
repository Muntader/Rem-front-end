import Vuex from "vuex";
import templates from "./templates/index";
import servers from "./servers/index";
const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      templates,
      servers
    }
  });
};

export default createStore;
