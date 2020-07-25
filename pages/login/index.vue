<template>
  <div>
    <div class="app-login" style="width: 70%">
        <h1>Please login to access admin panel</h1>
        <form v-if="!$store.state.authUser" @submit.prevent="login">
          <p class="error" v-if="formError">{{ formError }}</p>
          <div class="form">
            <input
              v-model="formUsername"
              name="t-api"
              type="text"
              class="f-border form-input"
              placeholder="Access Key"
            />
          </div>

          <pre>Used key that sent to your email.</pre>
          <button class="btn btn-blue" type="submit">Login</button>
        </form>
    </div>
  </div>
</template>

<script>
  export default {
    auth: false,

    data() {
      return {
        formError: null,
        formUsername: '',
        formPassword: ''
      }
    },
    middleware ({ store, redirect, app }) {
      // If the user is not authenticated
      if (app.$cookies.get('access_key')) {
        return redirect('/')
      }
    },

    methods: {
      async login() {
        try {
          await this.$store.dispatch('login', {
            key: this.formUsername
          });
          this.formUsername = '';
          this.formPassword = '';
          this.formError = null
        } catch (e) {
          this.formError = e.message
        }
      },
    }
  }
</script>
