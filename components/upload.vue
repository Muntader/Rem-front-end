<template>
  <div class="app-upload-component">
    <div class="progress-component" v-if="UList.length > 0">
      <div class="progress-component__header">
        <div class="flex">
          <h3 class="title">Uploading files</h3>
          <div :class="{'maximize': !ActiveMinimize, 'minimize': ActiveMinimize}" @click="ActiveMinimize = !ActiveMinimize"></div>
        </div>
      </div>
      <div class="progress-component__body">
        <div class="progress-component__body--list" v-show="ActiveMinimize">
          <ul>
            <li v-for="(item, index) in UList" :key="index">
              <div class="content">
                <div class="name"><p>{{item.name}} ({{item.server_name}})</p></div>
                <div class="progress-details">
                  <div class="flex">
                    <p class="size">{{fileSizeIEC2(item.loaded)}} / {{fileSizeIEC(item.total)}}</p>
                    <p class="percent">{{item.progress}}%</p>
                  </div>
                </div>
                <div class="progress">
                  <div class="p-background">
                    <div class="p-percent" :style="'width:' + item.progress  +'%;' "></div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    data() {
      return {
        ActiveMinimize: true
      }
    },
    computed: mapState({
      SList: state => state.servers.ServerList,
      UList: state => state.jobs.UploadList
    }),
    methods: {
      fileSizeIEC(a, b, c, d, e) {
        return (b = Math, c = b.log, d = 1024, e = c(a) / c(d) | 0, a / b.pow(d, e)).toFixed(2)
          + ' ' + (e ? 'KMGTPEZY'[--e] + 'B' : 'Bytes')
      },

      fileSizeIEC2(a, b, c, d, e) {
        return (b = Math, c = b.log, d = 1024, e = c(a) / c(d) | 0, a / b.pow(d, e)).toFixed(2)
      }
    }
  };
</script>
