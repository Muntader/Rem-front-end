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
              v-model="SEdit.name"
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
              v-model="SEdit.api_key"
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
              v-model="SEdit.domain"
              name="t-domain"
              type="text"
              class="f-border form-input"
              placeholder="Domian URL"
            />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="form">
          <label for="t-domain">Cloud Domain</label>
          <input
            v-model="SEdit.cloud_domain"
            name="t-domain"
            type="text"
            class="f-border form-input"
            placeholder="Cloud Domian URL"
          />
        </div>

        <!-- .form -->
        <div class="form btn-upload">
          <button class="btn btn-blue" @click="UpdateServer" v-if="!ButtonLoad">Update</button>
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
import { mapState } from "vuex";

export default {
  data() {
    return {
      ButtonLoad: false
    };
  },

  components: {
    ValidationProvider
  },

  computed: mapState({
    SEdit: state => state.servers.ServerEdit
  }),

  async fetch({ params, store }) {
    await store.dispatch("GET_SERVER_EDIT", params.id);
  },

  methods: {
    async UpdateServer() {
      this.ButtonLoad = true;
      await this.$store.dispatch("UPDATE_SERVER", {
        ID: this.SEdit._id,
        Name: this.SEdit.name,
        ApiKey: this.SEdit.api_key,
        Domain: this.SEdit.domain,
        CloudDomain: this.SEdit.cloud_domain
      });

      this.ButtonLoad = false;
    }
  }
};
</script>
