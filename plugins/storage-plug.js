export default function({ $axios, app }, inject) {
  const getServerUrl = app.$cookies.get("server-url");
  const getServerName = app.$cookies.get("server-name");
  const getServerKey = app.$cookies.get("server-key");
  const getAccessKey = app.$cookies.get('access_key')


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
        Authorization: getAccessKey
      }
    }
  });



  // Set baseURL to something different
  nodeServerApi.setBaseURL("http://localhost:3000");


  nodeServerApi.interceptors.response.use(response => {
    return response;
  }, error => {
    if (error.response.status === 401) {
      app.$cookies.remove('access_key');
      window.location.reload(true);
    }
    return error;
  });

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
