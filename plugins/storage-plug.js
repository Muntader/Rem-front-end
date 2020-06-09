export default function({ $axios, app }, inject) {
  const getServerUrl = app.$cookies.get("server-url");
  const getServerName = app.$cookies.get("server-name");
  const getServerKey = app.$cookies.get("server-key");

  $axios.onRequest(config => {
    config.headers.common["Authorization"] = getServerKey;
  });

  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        Authorization: getServerKey
      }
    }
  });

  // Set baseURL to something different
  api.setBaseURL(getServerUrl);

  // Inject to context as $api
  inject("api", api);

  // Create a custom axios instance
  const nodeServerApi = $axios.create({
    headers: {
      common: {
        Authorization: 33333
      }
    }
  });

  // Set baseURL to something different
  nodeServerApi.setBaseURL("http://localhost:3000");

  // Inject to context as $nodeServerApi
  inject("nodeServerApi", nodeServerApi);

  inject("myServerApi", {
    getActiveServerName: () => {
      return getServerName;
    },

    getActiveServerUrl: () => {
      return getServerUrl;
    }
  });
}
