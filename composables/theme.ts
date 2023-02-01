import { useStorage } from "@vueuse/core";

export const useTheme = defineStore("theme", () => {
  const theme = useStorage("vue-storage-theme", "light");

  function switchTheme() {
    if (theme.value === "light") {
      theme.value = "dark";
    } else {
      theme.value = "light";
    }
  }

  return { theme, switchTheme };
});
