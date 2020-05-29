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
          <label for="t-name">Name</label>
          <input
            v-model="Name"
            name="t-name"
            type="text"
            class="f-border form-input"
            placeholder="Template name"
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
            placeholder="emplate description"
          ></textarea>
        </div>
        <!-- /.form -->

        <!-- .form -->
        <div class="form">
          <label for="t-encode">Encode type:</label>

          <select name="t-encode" class="f-border form-input" v-model="EncodeType">
            <option value="DASH">DASH</option>
            <option value="HLS">HLS</option>
            <option value="HLS-MP3">HLS MP3</option>
          </select>
        </div>
        <!-- /.form -->

        <!-- .form -->
        <div class="presets">
          <div class="presets__head">
            <button
              :to="{name: 'jobs-create'}"
              type="button"
              class="btn btn-blue btn-plus"
              @click="AddPreset"
            >
              <span class="icon"></span>
            </button>
          </div>

          <div class="presets__body">
            <div
              class="presets__body--list"
              v-for="(item, index) in TemplateOptions.template.presets"
              :key="index"
            >
              <div class="form">
                <label for="t-name">
                  Name
                  <div
                    class="icon"
                    v-tooltip.right-start="'Add video export name example for better name : 220p or video_220 '"
                  ></div>
                </label>

                <input
                  v-model="item.name"
                  name="t-name"
                  type="text"
                  class="f-border form-input"
                  placeholder="Preset name"
                />
              </div>

              <div class="form">
                <label for="t-preset">
                  Preset
                  <div
                    class="icon"
                    v-tooltip.right-start="'A preset is a collection of options that will provide a certain encoding speed to compression ratio. A slower preset will provide better compression (compression is quality per filesize).'"
                  ></div>
                </label>
                <select name="t-encode" class="f-border form-input" v-model="item.preset">
                  <option value="ultrafast">ultrafast</option>
                  <option value="superfast">superfast</option>
                  <option value="veryfast">veryfast</option>
                  <option value="faster">faster</option>
                  <option value="fast">fast</option>
                  <option value="medium">medium</option>

                  <option value="slow">slow</option>
                  <option value="slower">slower</option>
                  <option value="veryslow">veryslow</option>
                </select>
              </div>
              <div class="form">
                <label for="t-videobitrate">
                  Video Bitrate
                  <div class="icon" v-tooltip.right-start="'Add video bit per second exm: 2000000'"></div>
                </label>
                <input
                  v-model="item.videobitrate"
                  name="t-name"
                  type="text"
                  class="f-border form-input"
                  placeholder="Video bitrate"
                />
              </div>
              <div class="form">
                <label for="t-audiobitrate">
                  Audio Bitrate
                  <div
                    class="icon"
                    v-tooltip.right-start="'Here you can specify the number of bits per second'"
                  ></div>
                </label>
                <input
                  v-model="item.audiobitrate"
                  name="t-audiobitrate"
                  type="text"
                  class="f-border form-input"
                  placeholder="Audio bitrate "
                />
              </div>
              <div class="form">
                <label for="t-scale">
                  Scale
                  <div
                    class="icon"
                    v-tooltip.right-start="'simply resize your video to a specific size (e.g 320)'"
                  ></div>
                </label>
                <input
                  v-model="item.scale"
                  name="t-scale"
                  type="text"
                  class="f-border form-input"
                  placeholder="Video scale"
                />
              </div>
              <hr />
            </div>
          </div>
        </div>
        <!-- /.form -->

        <!-- .form -->
        <div class="form btn-upload">
          <button class="btn btn-blue">Upload</button>
          <button class="btn btn-blue" disabled>
            <i class="ic-load ic-load-light"></i>
          </button>
        </div>
        <!-- /.form -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      EncodeType: "HLS",
      Name: "",
      Description: "",
      TemplateOptions: {
        template: {
          presets: [],
          options: {
            enctype: "string",
            encstatus: false,
            cloudtype: "local",
            mpdoptions: {
              usesegmenttimeline: true,
              hls: false,
              hlsmasterplaylistname: "master.m3u8",
              smooth: false,
              smoothclientmanifestname: null,
              smoothservermanifestname: null
            },
            thumbnailoptions: {
              thumbnail: true,
              scale: 360,
              format: null,
              time: null
            },

            awsoptions: {
              region: "eu-central-1",
              bucket: "enkimusic"
            }
          }
        }
      }
    };
  },

  methods: {
    AddPreset() {
      console.log(this.TemplateOptions.template.presets);

      this.TemplateOptions.template.presets.push({
        name: "",
        videobitrate: 0,
        audiobitrate: null,
        aspectratio: null,
        resolution: null,
        scale: null,
        preset: "faster"
      });
    }
  }
};
</script>
