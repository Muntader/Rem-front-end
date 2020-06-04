
<template>
  <div class="app-create-jobs">
    <div class="app-create-jobs__header m-header">
      <div class="flex-1">
        <router-link :to="{ name: 'settings-servers' }" class="btn btn-light">
          <div class="icon-back"></div>
        </router-link>
      </div>
    </div>
    <div class="app-create-jobs__body">
      <div class="w-50">
        <div class="form">
          <label for="t-name">Name</label>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <input
              v-model="Name"
              name="t-name"
              type="text"
              class="f-border form-input"
              placeholder="Template name"
            />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="form">
          <label for="t-api">API Key</label>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <input
              v-model="ApiKey"
              name="t-api"
              type="text"
              class="f-border form-input"
              placeholder="API Key"
            />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="form">
          <label for="t-domain">Domain</label>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <input
              v-model="Domain"
              name="t-domain"
              type="text"
              class="f-border form-input"
              placeholder="Domian URL"
            />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <!-- .form -->
        <div class="form btn-upload">
          <button class="btn btn-blue" @click="CreateServer" v-if="!ButtonLoad">Upload</button>
          <button class="btn btn-blue" disabled v-else>
            <i class="ic-load ic-load-light"></i>
          </button>
        </div>
        <!-- /.form -->
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  data() {
    return {
      Name: "",
      ApiKey: "",
      Domain: "",
      ButtonLoad: false
    };
  },

  components: {
    ValidationProvider
  },

  methods: {
    async CreateServer() {
      this.ButtonLoad = true;
      await this.$store.dispatch("CREATE_Te", {
        Name: this.Name,
        ApiKey: this.ApiKey,
        Domain: this.Domain
      });

      this.ButtonLoad = false;
    }
  }
};
</script>
