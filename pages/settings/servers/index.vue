<template>
  <div class="app-jobs-manage">
    <div class="app-jobs-manage__header">
      <div class="flex-1"></div>
      <div class="flex-2">
        <router-link
          :to="{name: 'settings-servers-create'}"
          type="button"
          class="btn btn-blue"
          v-tooltip.top-center="'Create new template'"
        >
          <span class="icon"></span>
        </router-link>
      </div>
    </div>

    <div class="app-jobs-manage__body">
      <div class="app-table">
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>API Key</th>
            <th>Domain</th>
            <th></th>
          </tr>
          <tbody>
            <tr v-for="(item, index) in SList" :key="index">
              <td>{{item._id}}</td>
              <td>{{item.name}}</td>
              <td>{{item.api_key}}</td>
              <td>{{item.domain}}</td>
              <td>
                <div class="app-table-more dropdown">
                  <div class="icon" @click="UpdateDropdown(index)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      version="1.1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 426.667 426.667"
                      style="enable-background:new 0 0 426.667 426.667;"
                      xml:space="preserve"
                    >
                      <g>
                        <g>
                          <circle cx="42.667" cy="213.333" r="42.667" />
                        </g>
                      </g>
                      <g>
                        <g>
                          <circle cx="213.333" cy="213.333" r="42.667" />
                        </g>
                      </g>
                      <g>
                        <g>
                          <circle cx="384" cy="213.333" r="42.667" />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <transition name="dropdown-ts">
                    <div class="menu dw-blue" v-show="ActiveOptionsDropdown === index">
                      <ul>
                        <li class="item" @click="DeleteServer(item._id, index)">
                          <span class="delete-icon"></span>
                          Delete
                          <span
                            class="ic-load ic-load-light"
                            v-if="DeleteButtonLoad === item._id"
                          ></span>
                        </li>
                      </ul>
                    </div>
                  </transition>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template> 

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      ActiveOptionsDropdown: null,
      DeleteButtonLoad: 0,
      ShowJob: 0
    };
  },

  computed: mapState({
    SList: state => state.servers.ServerList
  }),

  async fetch({ $axios, params, store }) {
    await store.dispatch("GET_SERVER_LIST");
  },

  created() {},

  methods: {
    ShowJobDetails(index) {
      if (this.ShowJob !== index) {
        this.ShowJob = 1;
      }
    },

    UpdateDropdown(index) {
      if (this.ActiveOptionsDropdown == index) {
        this.ActiveOptionsDropdown = null;
        return;
      }
      this.ActiveOptionsDropdown = index;
    },

    async DeleteServer(id, index) {
      this.DeleteButtonLoad = id;
      await this.$store.dispatch("DELETE_SERVER", {
        ID: id,
        INDEX: index
      });

      this.DeleteButtonLoad = null;
    }
  }
};
</script>
