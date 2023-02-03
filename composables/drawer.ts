import { useStorage } from "@vueuse/core";

export const useDrawer = defineStore("drawer", () => {
  const { t } = useI18n();

  const drawer = useStorage("vue-storage-drawer", false);
  const items = ref([
    {
      props: {
        prependIcon: "mdi-view-dashboard",
        to: "/dashboard",
      },
      title: t("drawer.dashboard.title"),
      value: "dashboard",
    },
    {
      props: {
        prependIcon: "mdi-wallet ",
        to: "/wallets",
      },
      title: t("drawer.wallets.title"),
      value: "walltes",
      to: "/walltes",
    },
  ]);

  return { drawer, items };
});
