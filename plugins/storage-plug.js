import Vue from "vue";

export default (ctx, inject, sHMR, isClient) => {
  if (isClient) {
    inject("apiUrl", {
      getServerUrl: () => {
        return localStorage.getItem("server-url");
      }
    });
  }
};
