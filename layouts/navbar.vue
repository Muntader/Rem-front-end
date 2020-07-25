<template>
  <div class="navbar">
    <div class="navbar__left">
      <div class="navbar__left--dropdown dropdown" v-tooltip.top-center="'Please dont change server uploading files'">
        <button type="button" @click="ActiveLeftDropdown = !ActiveLeftDropdown">
          <span class="icon">
            <img src="~/assets/icons/server.svg" alt="server"/>
          </span>
          <span class="text">{{ActiveServerName}}</span>
          <i class="arrow" :class="{'down': ActiveLeftDropdown, 'up': !ActiveLeftDropdown}"></i>
        </button>
        <transition name="dropdown-ts">
          <div class="menu dw-blue" v-show="ActiveLeftDropdown">
            <ul>
              <li
                class="item"
                v-for="(item, index) in SList"
                :key="index"
                @click="UpdateApiServer(item)"
              >
                <a href="#">{{item.name}}</a>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
    <div class="navbar__right">
      <div class="navbar__left--dropdown dropdown">
        <button type="button" @click="ActiveRightDropdown = !ActiveRightDropdown">
           <span class="icon">
             <img src="~/assets/icons/gear.svg" alt="setting"/>
           </span>
        </button>
        <transition name="dropdown-ts">
          <div class="menu right-menu dw-blue" v-show="ActiveRightDropdown">
            <ul>
              <li class="item" @click="Logout()">
                <a href="#">Logout</a>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    data() {
      return {
        ActiveServerName: "",
        ActiveLeftDropdown: false,
        ActiveRightDropdown: false
      };
    },

    computed: mapState({
      SList: state => state.servers.ServerList,
      UList: state => state.jobs.UploadList
    }),

    mounted() {
      this.ActiveServerName = this.$myServerApi.getActiveServerName();
    },
    methods: {
      UpdateApiServer(server) {
        this.$cookies.set("server-url", server.domain);
        this.$cookies.set("server-key", server.api_key);
        this.$cookies.set("server-name", server.name);
        this.$cookies.set("server-cloud", server.cloud_domain);
        window.location.reload(true);
      },
      Logout() {
        this.$cookies.remove('access_key');
        window.location.reload(true);
      }
    }
  };
</script>
