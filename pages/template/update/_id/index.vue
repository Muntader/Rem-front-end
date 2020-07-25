<template>
  <div class="template-create-page app-create-jobs">
    <div class="app-create-jobs__header m-header">
      <div class="flex-1">
        <router-link :to="{ name: 'template-manage' }" class="btn btn-light">
          <div class="icon-back"></div>
        </router-link>
      </div>
    </div>
    <div class="app-create-jobs__body">
      <div class="w-50">
        <div class="form">
          <label for="t-name">Name</label>

          <ValidationProvider rules="required" v-slot="{ errors }">
            <input
              v-model="TEdit.name"
              name="t-name"
              id="t-name"
              type="text"
              class="f-border form-input"
              placeholder="Template name"
            />
            <span class="input-vaild-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <!-- .form -->
        <div class="form">
          <label for="t-description">Description</label>

          <ValidationProvider rules="required" v-slot="{ errors }">
            <textarea
              v-model="TEdit.description"
              name="t-description"
              id="t-description"
              class="f-border form-input"
              cols="10"
              rows="5"
              placeholder="Template description"
            ></textarea>
            <span class="input-vaild-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <!-- /.form -->

        <hr />

        <!-- .form -->
        <div class="form">
          <label for="t-encode">Encode type:</label>

          <ValidationProvider rules="required" v-slot="{ errors }">
            <select
              name="t-encode"
              id="t-encode"
              class="f-border form-input"
              v-model="TEdit.template.template.options.format"
            >
              <option value="DASH">DASH</option>
              <option value="HLS">HLS</option>
              <option value="HLS-MP3">HLS MP3</option>
            </select>

            <span class="input-vaild-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <!-- /.form -->

        <!-- .presets -->
        <div class="presets">
          <div class="presets__head">
            <button
              v-if="!HideAddPresetButton"
              :to="{ name: 'jobs-create' }"
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
              v-for="(item, index) in TEdit.template.template.presets"
              :key="index"
            >
              <div class="form">
                <label for="t-name">
                  Name
                  <span
                    class="icon"
                    v-tooltip.right-start="
                      'Add video export name example for better name : 220p or video_220 '
                    "
                  ></span>
                </label>

                <ValidationProvider rules="required" v-slot="{ errors }">
                  <input
                    v-model="item.name"
                    name="t-name"
                    type="text"
                    class="f-border form-input"
                    placeholder="Preset name"
                  />

                  <span class="input-vaild-error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="form">
                <label for="t-preset">
                  Preset
                  <span
                    class="icon"
                    v-tooltip.right-start="
                      'A preset is a collection of options that will provide a certain encoding speed to compression ratio. A slower preset will provide better compression (compression is quality per filesize).'
                    "
                  ></span>
                </label>

                <ValidationProvider rules="required" v-slot="{ errors }">
                  <select
                    name="t-preset"
                    id="t-preset"
                    class="f-border form-input"
                    v-model="item.preset"
                  >
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

                  <span class="input-vaild-error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div
                class="form"
                v-if="TEdit.template.template.options.format !== 'HLS-MP3'"
              >

                <label for="t-videobitrate">
                  Video Bitrate
                  <span
                    class="icon"
                    v-tooltip.right-start="
                      'Add video bit per second exm: 2000000'
                    "
                  ></span>
                </label>

                <ValidationProvider rules="required" v-slot="{ errors }">
                  <input
                    v-model.number="item.videobitrate"
                    name="t-videobitrate"
                    id="t-videobitrate"
                    type="text"
                    class="f-border form-input"
                    placeholder="Video bitrate"
                  />
                  <span>{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form">
                <label for="t-audiobitrate">
                  Audio Bitrate
                  <div
                    class="icon"
                    v-tooltip.right-start="
                      'Here you can specify the number of bits per second'
                    "
                  ></div>
                </label>
                <input
                  v-model.number="item.audiobitrate"
                  name="t-audiobitrate"
                  id="t-audiobitrate"
                  type="text"
                  class="f-border form-input"
                  placeholder="Audio bitrate "
                />
              </div>
              <div
                class="form"
                v-if="TEdit.template.template.options.format !== 'HLS-MP3'"
              >

                <label for="t-scale">
                  Scale
                  <span
                    class="icon"
                    v-tooltip.right-start="
                      'simply resize your video to a specific size (e.g 320)'
                    "
                  ></span>
                </label>

                <ValidationProvider rules="required" v-slot="{ errors }">
                  <input
                    v-model.number="item.scale"
                    name="t-scale"
                    id="t-scale"
                    type="text"
                    class="f-border form-input"
                    placeholder="Video scale"
                  />

                  <span class="input-vaild-error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="splice-preset">
                <button
                  v-if="!HideAddPresetButton"
                  :to="{ name: 'jobs-create' }"
                  type="button"
                  class="btn btn-danger btn-delete"
                  @click="RemovePreset(index)"
                >
                  <span class="icon"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- /.presets -->

        <!-- .dash -->
        <div
          class="dash"
          v-if="TEdit.template.template.options.format === 'DASH'"
        >
          <div class="switch">
            <div class="form">
              <label class="switch-title">
                Output HLS
                <span
                  class="icon"
                  v-tooltip.right-start="
                    'Output HLS playlists in addition to MPEG DASH'
                  "
                ></span>
              </label>
            </div>
            <label class="switch-label">
              <input
                type="checkbox"
                v-model="TEdit.template.template.options.mpdoptions.hls"
              />
              <span class="slider round"></span>
            </label>
          </div>

          <div class="switch">
            <div class="form">
              <label class="switch-title">
                Output Smooth
                <span
                  class="icon"
                  v-tooltip.right-start="'Produce an output compatible with Smooth Streaming'"
                ></span>
              </label>
            </div>
            <label class="switch-label">
              <input
                type="checkbox"
                v-model="TEdit.template.template.options.mpdoptions.smooth"
              />
              <span class="slider round"></span>
            </label>
          </div>
        </div>
        <!-- /.dash -->

        <!-- .storage -->
        <div class="storage">
          <div class="form">
            <label for="t-storage">Choose storage</label>

            <select
              name="t-encode"
              id="t-storage"
              class="f-border form-input"
              v-model="TEdit.template.template.options.cloudtype"
            >
              <option value="aws">AWS S3</option>
            </select>
          </div>

          <div
            class="form"
            v-if="TEdit.template.template.options.cloudtype === 's3'"
          >
            <label for="t-region">S3 region</label>

            <ValidationProvider rules="required" v-slot="{ errors }">
              <input
                v-model="TEdit.template.template.options.awsoptions.region"
                name="t-region"
                id="t-region"
                type="text"
                class="f-border form-input"
                placeholder="AWS S3 region"
              />
              <span class="input-vaild-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div
            class="form"
            v-if="TEdit.template.template.options.cloudtype === 'aws'"
          >
            <label for="t-storage">S3 bucket</label>

            <ValidationProvider rules="required" v-slot="{ errors }">
              <input
                v-model="TEdit.template.template.options.awsoptions.bucket"
                name="t-storage"
                type="text"
                class="f-border form-input"
                placeholder="AWS S3 bucket"
              />
              <span class="input-vaild-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div
            class="form"
            v-if="TEdit.template.template.options.cloudtype === 'aws'"
          >
            <label for="t-storage">S3 region</label>

            <ValidationProvider rules="required" v-slot="{ errors }">
              <input
                v-model="TEdit.template.template.options.awsoptions.region"
                name="t-storage"
                type="text"
                class="f-border form-input"
                placeholder="AWS S3 region"
              />
              <span class="input-vaild-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
        </div>
        <!-- /.storage -->

        <hr />

        <!-- .thumbnail -->
        <div
          class="thumbnail"
          v-if="TEdit.template.template.options.format !== 'HLS-MP3'"
        >
          <!-- Rounded switch -->

          <div class="switch">
            <div class="form">
              <label class="switch-title">Thumbnail</label>
            </div>
            <label class="switch-label">
              <input
                type="checkbox"
                v-model="
                  TEdit.template.template.options.thumbnailoptions.thumbnail
                "
              />
              <span class="slider round"></span>
            </label>
          </div>

          <div
            class="form"
            v-if="TEdit.template.template.options.thumbnailoptions.thumbnail"
          >
            <label for="t-scale">Image scale</label>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <input
                v-model="
                  TEdit.template.template.options.thumbnailoptions.scale
                "
                name="t-scale"
                type="text"
                class="f-border form-input"
                placeholder="Image scale size ex: 320"
              />

              <span>{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
        </div>

        <!-- /.thumbnail -->

        <!-- .form -->
        <div class="form btn-upload">
          <button
            class="btn btn-blue"
            @click="UpdateTemplate"
            v-if="!ButtonLoad"
          >
            Update
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
  import { mapState } from "vuex";
  import { ValidationProvider } from "vee-validate";
  export default {
    data() {
      return {
        EncodeType: "HLS",
        Name: "",
        Description: "",
        ButtonLoad: false,
        HideAddPresetButton: false
      };
    },

    watch: {
      TEdit: {
        // This will let Vue know to look inside the array
        deep: true,
        // We have to move our method to a handler field
        handler() {
          setTimeout( () => {
            if (this.TEdit.template.template.options.format === "HLS-MP3" && this.TEdit.template.template.presets.length  > 1) {
              this.TEdit.template.template.presets = [];
            }
          }, 200);
        }
      }
    },

    components: {
      ValidationProvider
    },

    computed: mapState({
      TEdit: state => state.templates.TemplateEdit
    }),

    async fetch({ $axios, params, store }) {
      await store.dispatch("GET_TEMPLATE_EDIT", params.id);
    },

    methods: {
      async UpdateTemplate() {
        this.ButtonLoad = true;
        await this.$store.dispatch("UPDATE_TEMPLATE", {
          ID: this.TEdit._id,
          Name: this.TEdit.name,
          Description: this.TEdit.description,
          Template: this.TEdit.template
        });
        this.ButtonLoad = false;
      },

      AddPreset() {
        if (this.TEdit.template.template.options.format === "HLS-MP3") {
          if (this.TEdit.template.template.presets.length < 1) {
            this.HideAddPresetButton = true;
            this.TEdit.template.template.presets.push({
              name: "",
              videobitrate: 0,
              audiobitrate: null,
              aspectratio: null,
              resolution: null,
              scale: null,
              preset: "faster"
            });
          }
        } else {
          this.TEdit.template.template.presets.push({
            name: "",
            videobitrate: 0,
            audiobitrate: null,
            aspectratio: null,
            resolution: null,
            scale: null,
            preset: "faster"
          });
        }
      },

      RemovePreset(index) {
        this.TEdit.template.template.presets.splice(index, 1)
      }
    }
  };
</script>
