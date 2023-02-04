import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import defaults from "~~/plugins/vuetify/defaults";
import theme from "~~/plugins/vuetify/theme";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    defaults,
    directives,
    theme,
  });

  nuxtApp.vueApp.use(vuetify);
});
