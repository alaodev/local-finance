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
    [
      "@nuxtjs/i18n",
      {
        defaultLocale: "en",
        langDir: "./locales/",
        locales: [
          { code: "en", iso: "en-US", file: "en.json", dir: "ltr" },
          { code: "pt-br", iso: "pt-BR", file: "pt-br.json", dir: "ltr" },
        ],
        strategy: "no_prefix",
      },
    ],
    ["@pinia/nuxt", { autoImports: ["defineStore", "storeToRefs"] }],
  ],
  ssr: false,
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
});
