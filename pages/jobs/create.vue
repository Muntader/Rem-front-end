<template>
  <div class="app-create-jobs">
    <div class="app-create-jobs__header m-header">
      <div class="flex-1">
        <router-link :to="{name: 'jobs-manage'}" class="btn btn-light">
          <div class="icon-back"></div>
        </router-link>
      </div>
    </div>
    <div class="app-create-jobs__body">
      <div class="w-50">
        <div class="form">
          <input type="text" class="f-border form-input" placeholder="Add text here " />
        </div>

        <div class="form">
          <client-only>
            <div class="upload f-border">
              <ul v-if="files.length">
                <li v-for="(file, index) in files" :key="file.id">
                  <span>{{file.name}}</span>
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

              <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
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

        <!-- .form -->
        <div class="form">
          <div class="servers">
            <div class="flex">
              <div class="flex__item f-border w-50">
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
                      <h4>Server name</h4>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /.form -->
      </div>
    </div>
  </div>
</template>
<script>
import FileUpload from "vue-upload-component";
export default {
  components: {
    FileUpload
  },
  data() {
    return {
      files: []
    };
  }
};
</script>
