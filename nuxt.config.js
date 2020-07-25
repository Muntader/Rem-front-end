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
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      {
        src: "https://cdn.jwplayer.com/libraries/RS5IBWBT.js"
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
    "~/plugins/vee-validate.js",
    { src:  "~/plugins/websocket.js", ssr: false},
    { src: "~/plugins/storage-plug.js", ssr: true }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "cookie-universal-nuxt",
    "nuxt-clipboard2",
    "@nuxtjs/axios",
    "@nuxtjs/toast",
    '@nuxtjs/date-fns',
  ],

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
  },

  router: {
    middleware: ['auth']
  }
};
