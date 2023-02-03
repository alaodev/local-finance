import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import defaults from "~~/plugins/vuetify/defaults";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    defaults,
    directives,
    theme: {
      themes: {
        light: {
          colors: {
            primary: "#009ee3",
          },
        },
        dark: {
          dark: true,
          colors: {
            primary: "#009ee3",
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
