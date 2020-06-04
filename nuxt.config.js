module.exports = {
  mode: "universal",
  /*
   ** Headers of the page
   */

  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: "https://cdn.plyr.io/3.6.2/plyr.css" }
    ],
    script: [
      {
        src: "https://cdn.plyr.io/3.6.2/plyr.js"
      },
      {
        src: "https://cdn.rawgit.com/video-dev/hls.js/18bb552/dist/hls.min.js"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["@/assets/sass/main.scss", "plyr/dist/plyr.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/vue-tooltip.js",
    "~/plugins/vue-upload.js",
    "~/plugins/plyr.js",
    "~/plugins/vee-validate.js",
    "~/plugins/storage-plug.js"
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/toast"],

  /*
   ** Toast configuration
   */
  toast: {
    position: "top-center"
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ["vee-validate/dist/rules"],

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
