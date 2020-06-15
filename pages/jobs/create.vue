<template>
  <div class="app-create-jobs">
    <div class="app-create-jobs__header m-header">
      <div class="flex-1">
        <router-link :to="{ name: 'jobs-manage' }" class="btn btn-light">
          <div class="icon-back"></div>
        </router-link>
      </div>
    </div>
    <div class="app-create-jobs__body">
      <div class="w-50">
        <div class="form">
          <label for="t-storage">Name</label>
          <input
            type="text"
            class="f-border form-input"
            placeholder="Name of upload"
            v-model="Name"
          />
        </div>

        <!-- .form -->
        <div class="form">
          <label for="t-description">Description</label>
          <textarea
            v-model="Description"
            name="t-description"
            class="f-border form-input"
            cols="10"
            rows="5"
            placeholder="Description of upload"
          ></textarea>
        </div>
        <!-- /.form -->

        <div class="form">
          <label for="t-description">
            Videos files
            <div
              class="icon"
              v-tooltip.right-start="'Able to drag and drop files'"
            ></div>
          </label>
          <client-only>
            <div class="upload f-border">
              <ul v-if="files.length">
                <li v-for="(file, index) in files" :key="file.id">
                  <span>{{ file.name }}</span>
                </li>
              </ul>
              <ul v-else>
                <td colspan="7">
                  <div class="text-center p-5">
                    <h4>
                      Drop files anywhere to upload
                      <br />or
                    </h4>
                  </div>
                </td>
              </ul>

              <div
                v-show="$refs.upload && $refs.upload.dropActive"
                class="drop-active"
              >
                <h3>Drop files to upload</h3>
              </div>
              <div class="btn btn-blue">
                <file-upload
                  class="btn btn-primary"
                  :multiple="true"
                  :drop="true"
                  :extensions="['mp4', 'mkv', 'avi', 'mp3']"
                  :drop-directory="true"
                  v-model="files"
                  ref="upload"
                >
                  <span class="icon"></span>
                  Select files
                </file-upload>
              </div>
            </div>
          </client-only>
        </div>

        <!-- .form server -->
        <div class="form">
          <label>
            Choose server
            <div
              class="icon"
              v-tooltip.right-start="
                'You can choose a server, by default we will divine videos to each server even if the servers are occupied the videos will be in queue after upload'
              "
            ></div>
          </label>
          <div class="servers">
            <div class="flex">
              <div
                class="flex__item f-border w-50"
                v-for="(item, index) in SList"
                :key="index"
                :class="{ active: SelectServer === index, busy: item.busy }"
                @click="SelectServerFunc(index)"
              >
                <div class="content">
                  <div class="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="bold"
                      enable-background="new 0 0 32 32"
                      viewBox="0 0 32 32"
                      width="55px"
                      class
                    >
                      <g>
                        <path
                          d="m21.667 19.333h-11.334c-1.286 0-2.333 1.047-2.333 2.334s1.047 2.333 2.333 2.333h11.333c1.287 0 2.334-1.047 2.334-2.333s-1.047-2.334-2.333-2.334zm-11.334 3.334c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.447 1-1 1zm3.334 0c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1z"
                          fill="#fd907e"
                          data-original="#FD907E"
                          class="dis"
                          style="fill:#1273EB"
                          data-old_color="#fd907e"
                        />
                        <path
                          d="m10.333 18h11.333c.67 0 1.297.184 1.838.499l-1.337-8.941c-.138-.903-.901-1.558-1.814-1.558h-8.706c-.913 0-1.676.655-1.814 1.56l-1.337 8.939c.54-.315 1.167-.499 1.837-.499z"
                          fill="#fc573b"
                          data-original="#FC573B"
                          class="disk"
                          style="fill:#1273EB"
                          data-old_color="#fc573b"
                        />
                      </g>
                    </svg>
                  </div>
                  <h4>{{ item.name }}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /.form server-->

        <!-- .form templates -->
        <div class="form">
          <label>Choose template</label>
          <div class="servers">
            <div class="flex">
              <div
                class="flex__item f-border w-50"
                v-for="(item, index) in TList"
                :key="index"
                :class="{ active: SelectTemplate === index }"
                @click="SelectTemplate = index"
              >
                <div class="content">
                  <div class="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="bold"
                      enable-background="new 0 0 32 32"
                      viewBox="0 0 32 32"
                      width="55px"
                      class
                    >
                      <g>
                        <path
                          d="m21.667 19.333h-11.334c-1.286 0-2.333 1.047-2.333 2.334s1.047 2.333 2.333 2.333h11.333c1.287 0 2.334-1.047 2.334-2.333s-1.047-2.334-2.333-2.334zm-11.334 3.334c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.447 1-1 1zm3.334 0c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1z"
                          fill="#fd907e"
                          data-original="#FD907E"
                          class="dis"
                          style="fill:#1273EB"
                          data-old_color="#fd907e"
                        />
                        <path
                          d="m10.333 18h11.333c.67 0 1.297.184 1.838.499l-1.337-8.941c-.138-.903-.901-1.558-1.814-1.558h-8.706c-.913 0-1.676.655-1.814 1.56l-1.337 8.939c.54-.315 1.167-.499 1.837-.499z"
                          fill="#fc573b"
                          data-original="#FC573B"
                          class="disk"
                          style="fill:#1273EB"
                          data-old_color="#fc573b"
                        />
                      </g>
                    </svg>
                  </div>
                  <h4>{{ item.name }}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /.form server-->

        <!-- .form -->
        <div class="form btn-upload">
          <button
            class="btn btn-blue"
            v-if="!ButtonLoad"
            @click="UploadVideos()"
          >
            Upload
          </button>
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
import FileUpload from "vue-upload-component";
import { mapState } from "vuex";
export default {
  components: {
    FileUpload
  },
  data() {
    return {
      Name: "",
      Description: "",
      SelectServer: null,
      SelectTemplate: null,
      ButtonLoad: false,
      files: []
    };
  },

  computed: mapState({
    SList: state => state.servers.ServerList,
    TList: state => state.templates.TemplateList,
    UList: state => state.jobs.UploadList
  }),

  async fetch({ $axios, params, store }) {
    await store.dispatch("GET_SERVER_LIST");
    await store.dispatch("GET_TEMPLATES_LIST");
  },

  mounted() {
    for (let i in this.SList) {
      this.$axios
        .get(this.SList[i].domain + "/api/v1/jobs/monitor/status")
        .then(
          response => {
            if (Math.trunc(response.data.data.cpu_system) < 50) {
              this.SList[i].busy = false;
            } else {
              this.SList[i].busy = true;
            }
          },
          err => {}
        );
    }
  },

  methods: {
    UploadVideos() {
      let uid = Math.floor(Math.random() * 9999999);
      let data = [];

      if (this.SelectServer !== "default") {
        for (let i in this.SList) {
          if (!this.SList[i].busy) {
            data.push({
              form: [],
              server_name: this.SList[i].name,
              api_key: this.SList[i].api_key,
              domain: this.SList[i].domain
            });
          }
        }

        let a = 0;
        for (let x = 0; x < this.files.length; x++) {
          data[a].form.push({
            file: this.files[x].file,
            file_name: this.files[x].file.name
          });

          this.$store.commit("SET_UPLOAD_LIST", {
            filename: this.files[x].file.name,
            progress: null,
            uid: uid
          });
          a++;
          if (data.length - 1 < a) {
            a = 0;
          }
        }

        let formD = new FormData();
        data.forEach(server => {
          server.form.forEach(file => {
            formD.append("files", file.file, file.file_name);
          });
          formD.append(
            "template",
            JSON.stringify(this.TList[this.SelectTemplate].template)
          );

          formD.append("name", this.Name);
          formD.append("template_id", this.TList[this.SelectTemplate]._id);
          formD.append("description", this.Description);

          // Upload progress
          const config = {
            onUploadProgress: progressEvent => {
              var percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );

              this.$store.commit("UPDATE_UPLOAD_LIST", {
                uid: uid,
                progress: percentCompleted
              });
            },
            headers: {
              Authorization: server.api_key,
              "Content-Type": "multipart/form-data"
            }
          };

          this.$store.dispatch("UPLOAD_VIDEOS_TO_SERVER", {
            data: formD,
            config: config,
            uid: uid,
            url: server.domain
          });

          formD = new FormData();
        });
      } else {
        let formD = new FormData();
        this.files.forEach(file => {
          formD.append("files", file.file, file.name);
          formD.append(
            "template",
            JSON.stringify(this.TList[this.SelectTemplate].template)
          );

          formD.append("name", this.Name);
          formD.append("template_id", this.TList[this.SelectTemplate]._id);
          formD.append("description", this.Description);
        });

        // Upload progress
        const config = {
          onUploadProgress: progressEvent => {
            var percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );

            this.$store.commit("UPDATE_UPLOAD_LIST", {
              uid: uid,
              progress: percentCompleted
            });
          },
          headers: {
            Authorization: this.SList[this.SelectServer].api_key,
            "Content-Type": "multipart/form-data"
          }
        };

        this.$store.dispatch("UPLOAD_VIDEOS_TO_SERVER", {
          data: formD,
          config: config,
          uid: uid,
          url: this.SList[this.SelectServer].domain
        });
      }

      setTimeout(() => {
        this.$router.push({ name: "jobs-manage" });
      }, 2000);
    },

    SelectServerFunc(index) {
      if (this.SelectServer === index) {
        this.SelectServer = "default";
        return;
      }
      this.SelectServer = index;
    }
  }
};
</script>
