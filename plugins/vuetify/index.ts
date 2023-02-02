import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import defaults from "~~/plugins/vuetify/defaults";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    defaults,
    directives,
  });

  nuxtApp.vueApp.use(vuetify);
});
