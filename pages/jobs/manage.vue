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
            <th>Name</th>
            <th>Server</th>
            <th>Input</th>
            <th>Template</th>
            <th>Storage</th>
            <th>Status</th>
            <th>Create at</th>
            <th></th>
          </tr>
          <tbody>
            <tr @click.prevent="ShowJobDetails(1)">
              <td>1</td>
              <td>Teek</td>
              <td>OVH Ser1</td>
              <td>HleadOper-xa.mp4</td>
              <td>HLS</td>
              <td>S3</td>
              <td id="status">
                <div class="st-upload">
                  <div class="dot"></div>
                  <span>Uploading</span>
                </div>
                <div class="st-transcoding">
                  <div class="dot"></div>
                  <span>Transcoding</span>
                </div>
                <div class="st-finish">
                  <div class="dot"></div>
                  <span>Finish</span>
                </div>
              </td>
              <td>2020-7-1 20:10</td>
              <td>
                <div class="app-table-more dropdown">
                  <div class="icon" @click="ActiveOptionsDropdown = 1">
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
                    <div class="menu dw-light" v-show="ActiveOptionsDropdown === 1">
                      <ul>
                        <li class="item">Server 2</li>
                        <li class="item">Server 2</li>
                      </ul>
                    </div>
                  </transition>
                </div>
              </td>
            </tr>
            <tr v-show="ShowJob === 1" class="tr-job">
              <td colspan="7">
                <div class="job-details">
                  <hr />
                  <div class="flex">
                    <div class="flex-1 w-50">
                      <div class="plyr">
                        <vue-plyr ref="plyr" :options="playerOptions" style="width: 100%;">
                          <video id="player" data-plyr-config="{'autoplay': false}"></video>
                        </vue-plyr>
                      </div>
                    </div>
                    <div class="flex-2 w-50">
                      <div class="details-list">
                        <ul class="details-list__name">
                          <li>ID</li>
                          <li>Transcoding name</li>
                          <li>File name</li>
                          <li>Input path</li>
                          <li>Output path</li>
                          <li>Thumbnail path</li>
                          <li>Storage</li>
                          <li>Bucket</li>
                          <li>Created at</li>
                        </ul>
                        <ul class="details-list__value">
                          <li>1000</li>
                          <li>GoogleVideo</li>
                          <li>music.mp4</li>
                          <li>/videos/storage/id/a.mp4</li>
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
                          <li>AWS S3</li>
                          <li>RTI_Videos</li>
                          <li>2020-1-20 20:30pm</li>
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
                            <li id="error">Error Logs</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr class="progress">
              <td colspan="9">
                <div class="progress-meter">
                  <span class="upload" style="width: 25%"></span>
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
import Hls from "hls.js";
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
      }
    };
  },
  created() {},
  computed: {
    player() {
      console.log(this.$refs.plyr.player);
      return this.$refs.plyr.player;
    }
  },
  methods: {
    ShowJobDetails(index) {
      if (this.ShowJob !== index) {
        this.ShowJob = 1;

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
