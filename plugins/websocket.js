export default ({store, app: { $cookies }}) => {

// Remove protocol from domain
  console.log($cookies.get("server-url") )
  if (typeof $cookies.get("server-url") !== "undefined") {
    const protocol = $cookies.get("server-url").slice(5);

// Create WebSocket connection.
    let wsconneciton1 = new WebSocket("ws:" + protocol + "/v1/ws/progress");
    wsconneciton1.onopen = function () {
      console.log("connected");
    };

    wsconneciton1.onclose = function (e) {
      console.log("connection closed (" + e.code + ")");
    };

    wsconneciton1.onmessage = e => {
      // deserialize json data
      var json = JSON.parse(e.data);
      store.commit("SET_TRANSCODING_PROGRESS_LIST", json);

    };

// Create WebSocket connection.
    let wsconneciton2 = new WebSocket("ws:" + protocol + "/v1/ws/messages");
    wsconneciton2.onopen = function () {
      console.log("connected");
    };

    wsconneciton2.onclose = function (e) {
      console.log("connection closed (" + e.code + ")");
    };

    wsconneciton2.onmessage = e => {
      // deserialize json data
      var json = JSON.parse(e.data);

      if (json.Status == "Progress") {
        store.commit("UPDATE_TRANSCODING_PROGRESS_STATUS", json);
        store.dispatch("GET_JOBS_LIST", "/api/v1/jobs/list/1")
      }
    };

  }
}
