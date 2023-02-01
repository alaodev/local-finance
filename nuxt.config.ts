// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ["vuetify"],
  },
  css: [
    "@mdi/font/css/materialdesignicons.min.css",
    "vuetify/lib/styles/main.sass",
  ],
  modules: [
    "@vueuse/nuxt",
    ["@pinia/nuxt", { autoImports: ["defineStore", "storeToRefs"] }],
  ],
  ssr: false,
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
});
