//Importing Line class from the vue-chartjs wrapper
import { Line } from "vue-chartjs";
//Exporting this so it can be used in other components
export default {
  extends: Line,
  props: ["data", "options"],
  mounted() {
    //renderChart function renders the chart with the datacollection and options object.
    this.renderChart(this.data, this.options);
  },
  watch: {
    data() {
      if (this.$data._chart) {
        this.$data._chart.destroy();
      }
      this.renderChart(this.data, this.options);
    }
  }
};
