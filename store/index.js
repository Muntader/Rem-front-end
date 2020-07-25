import Vuex from "vuex";
import templates from "./templates/index";
import servers from "./servers/index";
import jobs from "./jobs/index";
import auth from "./auth/index";

const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      templates,
      servers,
      jobs,
      auth
    }
  });
};

export default createStore;
