import { useStorage } from "@vueuse/core";

export const useNavigation = defineStore("navigation", () => {
  const { t } = useI18n();

  const dashboardTitle = computed(() => t("navigation.dashboard.title"));
  const walletsTitle = computed(() => t("navigation.wallets.title"));
  const cryptosTitle = computed(() => t("navigation.cryptos.title"));

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
    {
      props: {
        prependIcon: "mdi-bitcoin ",
        to: "/cryptos/",
      },
      title: cryptosTitle,
      value: "cryptos",
    },
  ]);

  return { drawer, items };
});
