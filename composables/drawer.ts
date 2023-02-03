import { useStorage } from "@vueuse/core";

export const useDrawer = defineStore("drawer", () => {
  const { t } = useI18n();

  const dashboardTitle = computed(() => t("drawer.dashboard.title"));
  const walletsTitle = computed(() => t("drawer.wallets.title"));

  const drawer = useStorage("vue-storage-drawer", false);
  const items = ref([
    {
      props: {
        prependIcon: "mdi-view-dashboard",
        to: "/dashboard",
      },
      title: dashboardTitle,
      value: "dashboard",
    },
    {
      props: {
        prependIcon: "mdi-wallet ",
        to: "/wallets",
      },
      title: walletsTitle,
      value: "walltes",
      to: "/walltes",
    },
  ]);

  return { drawer, items };
});
