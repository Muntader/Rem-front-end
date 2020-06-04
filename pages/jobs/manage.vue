<template>
  <div class="app-jobs-manage">
    <div class="app-jobs-manage__header">
      <div class="flex-1"></div>
      <div class="flex-2">
        <router-link
          :to="{name: 'jobs-create'}"
          type="button"
          class="btn btn-blue"
          v-tooltip.top-center="'Create new job'"
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
            <th>Job Name</th>
            <th>Input</th>
            <th>Template ID</th>
            <th>Storage</th>
            <th>Status</th>
            <th>Create at</th>
            <th></th>
          </tr>
          <tbody
            v-for="(item, index) in JList.records"
            :key="index"
            @click.prevent="ShowJobDetails(item.ID)"
          >
            <tr>
              <td>{{item.ID}}</td>
              <td>{{item.name}}</td>
              <td>{{item.file_name}}</td>
              <td>{{item.template_id}}</td>
              <td>{{item.storage}}</td>
              <td id="status">
                <div class="st-upload" v-if="item.status === 'Uploading'">
                  <div class="dot"></div>
                  <span>Uploading</span>
                </div>
                <div class="st-transcoding" v-if="item.status === 'Transcoding' ">
                  <div class="dot"></div>
                  <span>Transcoding</span>
                </div>
                <div class="st-finish" v-if="item.status === 'Finish' ">
                  <div class="dot"></div>
                  <span>Finish</span>
                </div>
              </td>
              <td>{{item.CreatedAt}}</td>
              <td>
                <div class="app-table-more dropdown">
                  <div class="icon" @click="ActiveOptionsDropdown = item.ID">
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
                    <div class="menu dw-light" v-show="ActiveOptionsDropdown === item.ID">
                      <ul>
                        <li class="item">Delete</li>
                      </ul>
                    </div>
                  </transition>
                </div>
              </td>
            </tr>

            <tr v-show="ShowJob === item.ID" class="tr-job">
              <td colspan="7">
                <div class="job-details">
                  <hr />
                  <div class="flex">
                    <div class="flex-1 w-50">
                      <div class="plyr">
                        <vue-plyr ref="plyr" :options="playerOptions" style="width: 100%;">
                          <video :id="item.ID" data-plyr-config="{'autoplay': false}"></video>
                        </vue-plyr>
                      </div>
                    </div>
                    <div class="flex-2 w-50">
                      <div class="details-list">
                        <ul class="details-list__name">
                          <li>ID</li>
                          <li>Transcoding name</li>
                          <li>File name</li>
                          <li>Output path</li>
                          <li>Thumbnail path</li>
                          <li>Storage</li>
                          <li>Bucket</li>
                          <li>Created at</li>
                        </ul>
                        <ul class="details-list__value">
                          <li>{{item.ID}}</li>
                          <li>{{item.name}}</li>
                          <li>{{item.file_name}}</li>
                          <li>
                            <a
                              href="https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
                            >https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8</a>
                          </li>
                          <li>
                            <a
                              href="https://bitdash-a.akamaihd.net/content/sintel/hls/"
                            >https://bitdash-a.akamaihd.net/content/sintel/hls/</a>
                          </li>
                          <li v-if="item.Storage === 's3' ">AWS S3</li>
                          <li v-else>Local</li>
                          <li v-if="item.Storage === 's3' ">{{item.bucket}}</li>
                          <li v-else>None</li>
                          <li>{{item.CreatedAt}}</li>
                        </ul>
                      </div>
                      <hr />
                      <div class="details-list">
                        <div class="details-list__name">
                          <ul>
                            <li>Logs</li>
                          </ul>
                        </div>
                        <div class="details-list__value">
                          <ul>
                            <li id="error">{{item.logs}}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr class="progress">
              <td
                colspan="9"
                v-for="(pitem, pindex) in UList"
                :key="pindex"
                v-if="pitem.filename === item.file_name && pitem.progress < 98"
              >
                <div class="progress-meter">
                  <span class="upload" :style="{ 'width': pitem.progress + '%'}"></span>
                </div>
              </td>

              <td colspan="9">
                <div
                  class="progress-meter"
                  v-for="(progress_item, progress_index) in ProgressList"
                  :key="progress_index"
                  v-if="progress_item.ID === item.ID"
                >
                  <span class="transcode" :style="{ 'width': progress_item.Progress + '%'}"></span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="app-table-pagination">
        <div class="pagination-section">
          <div class="flex-1">
            <div class="paginaiton-records">
              <p>1 to 10 from 1000 records</p>
            </div>
          </div>
          <div class="flex-2">
            <div class="pagination-pages">
              <p>Page 2 from 10</p>
            </div>

            <ul class="pagination second">
              <li class="prev">
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 492.004 492.004"
                    style="enable-background:new 0 0 492.004 492.004;"
                    xml:space="preserve"
                    width="12px"
                    class
                  >
                    <g transform="matrix(-1 -1.22465e-16 1.22465e-16 -1 492.004 492.004)">
                      <g>
                        <g>
                          <path
                            d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12    c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028    c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265    c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"
                            data-original="#000000"
                            class="active-path"
                            fill="#000000"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </a>
              </li>
              <li class="next">
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    width="12px"
                    x="0px"
                    y="0px"
                    viewBox="0 0 492.004 492.004"
                    style="enable-background:new 0 0 492.004 492.004;"
                    xml:space="preserve"
                  >
                    <g>
                      <g>
                        <path
                          d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12    c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028    c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265    c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"
                        />
                      </g>
                    </g>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
var _self = this;
import Hls from "hls.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      ActiveOptionsDropdown: 0,
      ShowJob: 0,
      playerOptions: {
        controls: [
          "play-large",
          "play",
          "progress",
          "current-time",
          "mute",
          "volume",
          "settings",
          "fullscreen"
        ],
        settings: ["quality", "speed", "loop"]
      },
      wsconneciton: null
    };
  },
  computed: {
    ...mapState({
      JList: state => state.jobs.JobsList,
      UList: state => state.jobs.UploadList,
      ProgressList: state => state.jobs.TranscodingProgressList
    }),
    player() {
      console.log(this.$refs);
      return this.$refs.plyr.player;
    }
  },

  mounted() {
    // Create WebSocket connection.
    this.wsconneciton = new WebSocket("ws://localhost:8080/v1/ws/progress");

    this.wsconneciton.onopen = function() {
      console.log("connected");
    };

    this.wsconneciton.onclose = function(e) {
      console.log("connection closed (" + e.code + ")");
    };

    this.wsconneciton.onmessage = e => {
      console.log("message received: " + e.data);
      // deserialize json data
      var json = JSON.parse(e.data);
      this.$store.commit("SET_TRANSCODING_PROGRESS_LIST", json);
    };
  },

  async fetch({ $axios, params, store }) {
    await store.dispatch("GET_JOBS_LIST");
  },

  methods: {
    ShowJobDetails(id) {
      if (this.ShowJob !== id) {
        this.ShowJob = id;
        console.log(this.player);
        return;
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(
            "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
          );
          hls.attachMedia(this.player.media);

          window.hls = hls;
        } else {
          console.log("hello");
        }
      }
    }
  }
};
</script>
