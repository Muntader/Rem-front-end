<template>
  <div class="app">
    <div class="app-layout">
      <div class="app-layout__sidebar">
        <sidebar></sidebar>
      </div>

      <div class="app-layout__body">
        <div class="app-layout__body--header" v-if="$cookies.get('access_key')">
          <navbar></navbar>
        </div>
        <div class="app-layout__body--content">
          <nuxt />
        </div>
        <UploadComponent></UploadComponent>
      </div>
    </div>
  </div>
</template>
<script>
import sidebar from "~/layouts/sidebar.vue";
import navbar from "~/layouts/navbar.vue";
import UploadComponent from "~/components/upload.vue";
export default {
  data() {
    return {};
  },

  components: {
    sidebar,
    navbar,
    UploadComponent
  },

  created() {
    this.$store.commit("SET_DEFAULT_SERVER_TO_STORAGE");
  },
};
</script>
