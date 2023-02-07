import { useStorage } from "@vueuse/core";

export const useNavigation = defineStore("navigation", () => {
  const { t } = useI18n();

  const dashboardTitle = computed(() => t("navigation.dashboard.title"));
  const walletsTitle = computed(() => t("navigation.wallets.title"));

  const drawer = useStorage("vue-storage-drawer", false);
  const items = ref([
    {
      props: {
        prependIcon: "mdi-view-dashboard",
        to: "/dashboard/",
      },
      title: dashboardTitle,
      value: "dashboard",
    },
    {
      props: {
        prependIcon: "mdi-wallet ",
        to: "/wallets/",
      },
      title: walletsTitle,
      value: "wallets",
    },
  ]);

  return { drawer, items };
});
