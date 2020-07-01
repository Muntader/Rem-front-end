<template>
  <div class="app-jobs-manage">
    <div class="app-jobs-manage__header">
      <div class="flex-1">
        <div class="dropdown">
          <button type="button" @click="ActiveLeftDropdown = !ActiveLeftDropdown">Generate CSV</button>
          <transition name="dropdown-ts">
            <div class="menu left-menu dw-light" v-show="ActiveLeftDropdown">
              <ul>
                <li class="item" @click="GenerateCSV(10)">Last 10</li>
                <li class="item" @click="GenerateCSV(10)">Last 20</li>
              </ul>
            </div>
          </transition>
        </div>
      </div>
      <div class="flex-2">
        <router-link
          :to="{ name: 'jobs-create' }"
          type="button"
          class="btn btn-blue"
          v-tooltip.top-center="'Create new job'"
        >
          <span class="icon"></span>
        </router-link>
      </div>
    </div>

    <div class="app-jobs-manage__body" v-if="!RequestLoad">
      <div class="app-table">
        <table>
          <tr>
            <th></th>
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
            @dblclick="ShowJobDetails(item)"
          >
            <tr>
              <td>
                <div class="img-mp3" v-if="item.format === 'HLS-MP3'">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enable-background="new 0 0 512 512"
                    viewBox="0 0 512 512"
                    width="48"
                  >
                    <g>
                      <path
                        d="m481 0v362c0 49.8-40.5 90-90 90-26.82 0-47.94-11.95-60-23.4-18.3-16.2-30-40.2-30-66.6s11.7-50.4 30-66.9c15.9-14.4 37.2-23.1 60-23.1 36.01 0 59.09 22.62 60 23.4v-138.2l-120 26.7-120 26.7v211.4c0 49.5-40.5 90-90 90s-90-40.5-90-90 40.5-90 90-90c23.1 0 44.1 9 60 23.4 0-260.4 0 1.6 0-288.8z"
                        fill="#4da6ff"
                      />
                      <path
                        d="m481 0v362c0 49.8-40.5 90-90 90-26.82 0-47.94-11.95-60-23.4v-133.5c15.9-14.4 37.2-23.1 60-23.1 36.01 0 59.09 22.62 60 23.4v-138.2l-120 26.7v-150.6z"
                        fill="#37f"
                      />
                    </g>
                  </svg>
                </div>
                <div class="img-thumbnail" v-else>
                  <div class="img" v-if="item.storage === 's3'">
                    <img
                      width="68"
                      onerror="this.style.display='none'"
                      :src="
                        'https://' +
                          item.bucket.String +
                          '.s3.' +
                          item.region.String +
                          '.amazonaws.com/' +
                          item.upload_id +
                          '/thumbnail/out-img-001.jpg'
                      "
                    />
                  </div>

                  <div class="img" v-if="item.storage === 'local'">
                    <img
                      width="68"
                      onerror="this.style.display='none'"
                      :src="
                        $cookies.get('server-url') +
                          '/storage/' +
                          item.upload_id +
                          '/HLS/thumbnail/out-img-001.jpg'
                      "
                    />
                  </div>
                </div>
              </td>
              <td>{{ item.ID }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.file_name }}</td>
              <td>{{ item.template_id }}</td>
              <td>{{ item.storage }}</td>
              <td id="status">
                <div class="st-upload" v-if="item.status === 'Uploading'">
                  <div class="dot"></div>
                  <span>Uploading</span>
                </div>
                <div class="st-transcoding" v-if="item.status === 'Transcoding'">
                  <div class="dot"></div>
                  <span>Transcoding</span>
                </div>

                <div class="st-transcoding" v-if="item.status === 'Queue'">
                  <div class="dot"></div>
                  <span>Queue</span>
                </div>

                <div class="st-upload-s3" v-if="item.status === 'Upload-to-s3'">
                  <div class="dot"></div>
                  <span>Upload To S3</span>
                </div>
                <div class="st-finish" v-if="item.status === 'Finish'">
                  <div class="dot"></div>
                  <span>Finish</span>
                </div>
                <div class="st-error" v-if="item.status === 'Error'">
                  <div class="dot"></div>
                  <span>Error</span>
                </div>
              </td>
              <td>{{ item.CreatedAt }}</td>
              <td>
                <div
                  class="app-table-more copy-link"
                  @click.prevent="
                    copySomething(
                      $cookies.get('server-url') +
                        '/storage/' +
                        item.upload_id +
                        '/HLS/master.m3u8'
                    )
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="_x31_"
                    enable-background="new 0 0 24 24"
                    width="12px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="m20.5 24h-12c-1.378 0-2.5-1.121-2.5-2.5v-15c0-1.379 1.122-2.5 2.5-2.5h12c1.378 0 2.5 1.121 2.5 2.5v15c0 1.379-1.122 2.5-2.5 2.5zm-12-19c-.827 0-1.5.673-1.5 1.5v15c0 .827.673 1.5 1.5 1.5h12c.827 0 1.5-.673 1.5-1.5v-15c0-.827-.673-1.5-1.5-1.5z"
                    />
                    <path
                      d="m4.5 21h-1c-1.378 0-2.5-1.121-2.5-2.5v-16c0-1.379 1.122-2.5 2.5-2.5h12c1.378 0 2.5 1.121 2.5 2.5 0 .276-.224.5-.5.5s-.5-.224-.5-.5c0-.827-.673-1.5-1.5-1.5h-12c-.827 0-1.5.673-1.5 1.5v16c0 .827.673 1.5 1.5 1.5h1c.276 0 .5.224.5.5s-.224.5-.5.5z"
                    />
                    <path
                      d="m18.5 17h-8c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h8c.276 0 .5.224.5.5s-.224.5-.5.5z"
                    />
                    <path
                      d="m18.5 21h-8c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h8c.276 0 .5.224.5.5s-.224.5-.5.5z"
                    />
                    <path
                      d="m18.5 13h-8c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h8c.276 0 .5.224.5.5s-.224.5-.5.5z"
                    />
                    <path
                      d="m18.5 9h-8c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h8c.276 0 .5.224.5.5s-.224.5-.5.5z"
                    />
                  </svg>
                </div>

                <div class="app-table-more dropdown">
                  <div class="icon" @click.prevent="ShowDropdown(item.ID)">
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
                    <div class="menu right-menu dw-blue" v-show="ActiveOptionsDropdown === item.ID">
                      <ul>
                        <li class="item" @click="DeleteJob(item.ID, index)">
                          <a href="#">
                            <span class="delete-icon"></span>
                            Delete
                            <span
                              class="ic-load ic-load-light"
                              v-if="DeleteButtonLoad === item.ID"
                            ></span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </transition>
                </div>
              </td>
            </tr>

            <tr v-if="ShowJob === item.ID" class="tr-job">
              <td colspan="9">
                <div class="job-details">
                  <hr />
                  <div class="flex">
                    <div class="flex-1 w-50">
                      <div class="playr">
                        <div id="jwplayer"></div>
                      </div>
                      <hr />

                      <div class="thumbnail" v-if="item.format !== 'HLS-MP3'">
                        <div class="d-img" v-for="(num, index) in 6">
                          <div class="img" v-if="item.storage === 's3'">
                            <img
                              onerror="this.style.display='none'"
                              :src="
                                'https://' +
                                  item.bucket.String +
                                  '.s3.' +
                                  item.region.String +
                                  '.amazonaws.com/' +
                                  item.upload_id +
                                  '/thumbnail/out-img-00' +
                                  num +
                                  '.jpg'
                              "
                            />
                          </div>
                        </div>

                        <div class="d-img" v-for="(num, index) in 6">
                          <div class="img" v-if="item.storage === 'local'">
                            <img
                              onerror="this.style.display='none'"
                              :src="
                                $cookies.get('server-url') +
                                  '/storage/' +
                                  item.upload_id +
                                  '/HLS/thumbnail/out-img-00' +
                                  num +
                                  '.jpg'
                              "
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="flex-2 w-50">
                      <div class="details-list">
                        <ul class="details-list__name">
                          <li>ID</li>
                          <li>Transcoding name</li>
                          <li>File name</li>
                          <li>Storage path</li>
                          <li v-if="item.format !== 'HLS-MP3'">Thumbnail path</li>
                          <li>Storage</li>
                          <li>Bucket</li>
                          <li>Created at</li>
                        </ul>
                        <ul class="details-list__value">
                          <li>{{ item.ID }}</li>
                          <li>{{ item.name }}</li>
                          <li>{{ item.file_name }}</li>
                          <li>
                            <a
                              v-if="item.storage === 's3'"
                              :href="
                                'https://' +
                                  item.bucket.String +
                                  '.s3.' +
                                  item.region.String +
                                  '.amazonaws.com/' +
                                  item.upload_id +
                                  '/master.m3u8'
                              "
                            >
                              https://{{ item.bucket.String }}.s3.
                              {{ item.region.String }}.amazonaws.com/{{
                              item.upload_id
                              }}/master.m3u8
                            </a>

                            <a
                              v-if="item.storage === 'local'"
                              :href="
                                $myServerApi.getActiveServerUrl() +
                                  '/storage/' +
                                  item.upload_id +
                                  '/HLS/master.m3u8'
                              "
                            >
                              {{
                              $myServerApi.getActiveServerUrl()
                              }}/storage/{{ item.upload_id }}/HLS/master.m3u8
                            </a>
                          </li>
                          <li v-if="item.format !== 'HLS-MP3'">
                            <a
                              v-if="item.storage === 's3'"
                              :href="
                                'https://' +
                                  item.bucket.String +
                                  '.s3.' +
                                  item.region.String +
                                  '.amazonaws.com/' +
                                  item.upload_id +
                                  '/thumbnail/'
                              "
                            >
                              https://{{ item.bucket.String }}.s3.
                              {{ item.region.String }}.amazonaws.com/{{
                              item.upload_id
                              }}/thumbnail/
                            </a>

                            <a
                              v-if="item.storage === 'local'"
                              :href="
                                $cookies.get('server-url') +
                                  '/storage/' +
                                  item.upload_id +
                                  '/HLS/thumbnail/'
                              "
                            >
                              {{ $cookies.get("server-url") }}/storage/{{
                              item.upload_id
                              }}/HLS/thumbnail/
                            </a>
                          </li>
                          <li v-if="item.storage === 's3'">AWS S3</li>
                          <li v-else>Local</li>
                          <li v-if="item.storage === 's3'">{{ item.bucket.String }}</li>
                          <li v-else>None</li>
                          <li>{{ item.CreatedAt }}</li>
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
                            <li id="error">
                              <p style="word-break: break-all;">{{ item.log.String }}</p>
                            </li>
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
                  <span class="upload" :style="{ width: pitem.progress + '%' }"></span>
                </div>
              </td>

              <td colspan="9">
                <div
                  class="progress-meter"
                  v-for="(progress_item, progress_index) in ProgressList"
                  :key="progress_index"
                  v-if="
                    progress_item.ID === item.ID && progress_item.Progress < 99
                  "
                >
                  <span class="transcode" :style="{ width: progress_item.Progress + '%' }"></span>
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
              <p>1 to 15 from {{ JList.total_record }} records</p>
            </div>
          </div>
          <div class="flex-2">
            <div class="pagination-pages">
              <p>Page {{ JList.page }} from {{ JList.total_page }}</p>
            </div>

            <ul class="pagination second">
              <li class="prev" @click="GetListUrl('/api/v1/jobs/list/' + JList.prev_page)">
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
              <li class="next" @click="GetListUrl('/api/v1/jobs/list/' + JList.next_page)">
                <a>
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
const FileDownload = require("js-file-download");
import Hls from "hls.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      ActiveLeftDropdown: false,
      ActiveOptionsDropdown: 0,
      ShowJob: 0,
      DeleteButtonLoad: 0,
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
      RequestLoad: state => state.jobs.RequestLoad,
      ProgressList: state => state.jobs.TranscodingProgressList
    })
  },

  mounted() {
    // Remove protocol from domain
    const protocol = this.$cookies.get("server-url").slice(5);

    // Create WebSocket connection.
    this.wsconneciton = new WebSocket("ws:" + protocol + "/v1/ws/progress");
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

    // Create WebSocket connection.
    this.wsconneciton = new WebSocket("ws:" + protocol + "/v1/ws/messages");
    this.wsconneciton.onopen = function() {
      console.log("connected");
    };

    this.wsconneciton.onclose = function(e) {
      console.log("connection closed (" + e.code + ")");
    };

    this.wsconneciton.onmessage = e => {
      // deserialize json data
      var json = JSON.parse(e.data);

      if (json.Status == "Progress") {
        this.$store.commit("UPDATE_TRANSCODING_PROGRESS_STATUS", json);
      }
    };
  },

  async fetch({ store }) {
    await store.dispatch("GET_JOBS_LIST", "/api/v1/jobs/list/1");
  },

  methods: {
    ShowJobDetails(item) {
      let playerInstance;
      if (this.ShowJob !== item.ID) {
        // show component
        this.ShowJob = item.ID;
        // update url
        let playUrl = null;
        let thumbUrl = null;
        if (item.storage === "s3") {
          playUrl =
            "https://" +
            item.bucket.String +
            ".s3." +
            item.region.String +
            ".amazonaws.com/" +
            item.upload_id +
            "/master.m3u8";

          thumbUrl =
            "https://" +
            item.bucket.String +
            ".s3." +
            item.region.String +
            ".amazonaws.com/" +
            item.upload_id +
            "/thumbnail/";
        } else if (item.storage === "local") {
          playUrl =
            this.$cookies.get("server-url") +
            "/storage/" +
            item.upload_id +
            "/HLS/master.m3u8";

          thumbUrl =
            this.$cookies.get("server-url") +
            "/storage/" +
            item.upload_id +
            "/HLS/thumbnail/";
        }

        // check player and destory it
        if (playerInstance) {
          playerInstance.remove();
        }

        // Init player
        setTimeout(() => {
          playerInstance = jwplayer("jwplayer").setup({
            playlist: [
              {
                image: thumbUrl + "out-img-003.jpg",
                file: playUrl,
                tracks: [
                  {
                    file: thumbUrl + "100/thumbnail.vtt",
                    kind: "thumbnails"
                  }
                ]
              }
            ],
            autostart: false
          });
        }, 500);
      }
    },
    async copySomething(text) {
      try {
        await this.$copyText(text);

        this.$toast.info("Copy video output link", {
          position: "top-right",
          duration: 2000
        });
      } catch (e) {
        console.error(e);
      }
    },

    GetListUrl(url) {
      this.$store.dispatch("GET_JOBS_LIST", url);
    },

    DeleteJob(id, index) {
      this.$store.dispatch("DELETE_JOB", { ID: id, INDEX: index });
    },

    GenerateCSV(limit) {
      this.$api.get("/api/v1/job/generate/csv/" + limit).then(
        res => {
          FileDownload(res.data, "jobs.csv");
        },
        err => {}
      );
    },

    ShowDropdown(id) {
      if (id === this.ActiveOptionsDropdown) {
        this.ActiveOptionsDropdown = 0;
        return;
      }
      this.ActiveOptionsDropdown = id;
    }
  }
};
</script>
