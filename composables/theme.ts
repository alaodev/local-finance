export const useTheme = defineStore("theme", () => {
  const theme = ref("light");

  function switchTheme() {
    if (theme.value === "light") {
      theme.value = "dark";
    } else {
      theme.value = "light";
    }
  }

  return { theme, switchTheme };
});
