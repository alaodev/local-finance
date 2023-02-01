export const useDrawer = defineStore("drawer", () => {
  const drawer = ref(false);
  const items = ref([
    {
      props: {
        prependIcon: "mdi-view-dashboard",
        to: "/dashboard",
      },
      title: "Dashboard",
      value: "dashboard",
    },
    {
      props: {
        prependIcon: "mdi-wallet ",
        to: "/wallets",
      },
      title: "Walltes",
      value: "walltes",
      to: "/walltes",
    },
  ]);

  return { drawer, items };
});
