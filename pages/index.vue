<template>
  <div class="app-dashboard">
    <div class="app-dashboard__header"></div>
    <div class="app-dashboard__body">
      <div class="app-dashboard__body--card">
        <div class="header">
          <div class="chart-job">
            <div class="title">
              <h3>Server transcode</h3>
            </div>

            <div class="cards">
              <div class="cards__item blue-card" v-if="this.JobsCount != null">
                <div class="calc">
                  <p>SUCCESS TRNASCODE</p>
                  <h3>{{this.JobsCount.success}}</h3>
                </div>
                <div class="icon icon-cpu"></div>
              </div>
              <div class="cards__item blue-card" v-if="this.JobsCount != null">
                <div class="calc">
                  <p>FAILED TRANSCODE</p>
                  <h3>{{this.JobsCount.failed}}</h3>
                </div>
                <div class="icon icon-memory"></div>
              </div>
            </div>

            <div class="chart-transcode">
              <line-chart :data="JobsDailyData" :options="Options"></line-chart>
            </div>
          </div>

          <div class="cards-container">
            <div class="title">
              <h3>Realtime server status</h3>
            </div>
            <div class="cards-container__body">
              <div class="cards">
                <div
                  class="cards__item blue-card"
                  :class="{'red-card': Math.trunc(this.SystemMonitor.cpu.cpu_system) > 80}"
                  v-if="this.SystemMonitor != null"
                >
                  <div class="calc">
                    <p>CPU</p>
                    <h3>{{Math.trunc(this.SystemMonitor.cpu.cpu_system)}}%</h3>
                  </div>
                  <div class="icon icon-cpu"></div>
                </div>
                <div
                  class="cards__item blue-card"
                  :class="{'red-card': Math.trunc(((this.SystemMonitor.memory.Used/this.SystemMonitor.memory.Total) * 100)) > 80}"
                  v-if="this.SystemMonitor != null"
                >
                  <div class="calc">
                    <p>MEMORY</p>
                    <h3>{{ Math.trunc(((this.SystemMonitor.memory.Used/this.SystemMonitor.memory.Total) * 100))}}%</h3>
                  </div>
                  <div class="icon icon-memory"></div>
                </div>
                <div class="cards__item blue-card" v-if="this.SystemMonitor != null">
                  <div class="calc">
                    <p>SERVER UPTIME</p>
                    <h3>{{ SecondsToHms(this.SystemMonitor.uptime_second)}}</h3>
                  </div>
                  <div class="icon icon-hourglass"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "./chart/line.js";

export default {
  components: {
    LineChart
  },
  data() {
    return {
      SystemMonitor: null,
      JobsDailyData: null,
      JobsCount: null,
      Options: {
        scales: {
          yAxes: [
            {
              id: "Daily",
              type: "linear",
              position: "left",
              ticks: {
                beginAtZero: false,
                display: true,
                callback: function(value) {
                  var price = Math.trunc(value);
                  return price;
                }
              },
              gridLines: {
                display: false
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ],
          zAxes: [
            {
              ticks: {
                display: false
              }
            }
          ]
        },
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false
      },
      wsconneciton: null
    };
  },
  mounted() {
    // get jobs list
    this.GetJobsDaily();
    this.GetJobsCount();

    // Create WebSocket connection.
    this.wsconneciton = new WebSocket("ws://localhost:8080/v1/ws/dashboard");
    this.wsconneciton.onopen = function() {
      console.log("connected");
    };

    this.wsconneciton.onclose = function(e) {
      console.log("connection closed (" + e.code + ")");
    };

    this.wsconneciton.onmessage = e => {
      // deserialize json data
      var json = JSON.parse(e.data);
      this.SystemMonitor = json;
    };
  },

  methods: {
    GetJobsDaily() {
      let bar_ctx = document.getElementById("line-chart").getContext("2d");
      let purple_orange_gradient = bar_ctx.createLinearGradient(0, 0, 0, 600);
      purple_orange_gradient.addColorStop(0, "rgba(33, 150, 243, 1)");
      purple_orange_gradient.addColorStop(1, "rgba(57, 73, 171, 0.90)");

      this.$api.get("/api/v1/jobs/monitor/daily/1").then(
        response => {
          if (response.status === 200) {
            // date + value
            let data = [];
            let labels = [];
            if (response.data.length > 0) {
              for (let i in response.data) {
                data.push(response.data[i].count);
                labels.push(response.data[i].hour);
              }
            }

            this.JobsDailyData = {
              perecent: data,
              all: 0,
              labels: labels,
              datasets: [
                {
                  label: "Video",
                  yAxisID: "Daily",
                  backgroundColor: purple_orange_gradient,
                  pointBackgroundColor: "#0073ff",
                  borderWidth: 2,
                  borderColor: "#2196F3",
                  pointBorderColor: "#fff",
                  //Data to be represented on y-axis
                  data: data
                }
              ]
            };
          }
        },
        error => {
          if (error.response.status === 404) {
            this.$router.push({ name: "404" });
          } else {
            this.$router.push("/");
          }
        }
      );
    },

    GetJobsCount() {
      this.$api.get("/api/v1/jobs/monitor/count").then(
        response => {
          if (response.status === 200) {
            this.JobsCount = response.data;
          }
        },
        error => {}
      );
    },

    SecondsToHms(d) {
      d = Number(d);
      var h = Math.floor(d / 3600);
      var m = Math.floor((d % 3600) / 60);
      var s = Math.floor((d % 3600) % 60);

      var hDisplay = h > 0 ? h + (h == 1 ? " h, " : " h, ") : "";
      var mDisplay = m > 0 ? m + (m == 1 ? " m, " : " m, ") : "";
      var sDisplay = s > 0 ? s + (s == 1 ? " s" : " s") : "";
      return hDisplay + mDisplay + sDisplay;
    }
  }
};
</script>


