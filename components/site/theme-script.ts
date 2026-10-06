export const THEME_STORAGE_KEY = "manner-theme"

/**
 * Runs before first paint (inlined in <head>) so the page never flashes the
 * wrong theme. Also re-applies when another document — e.g. a block preview
 * iframe's parent — changes the stored theme.
 */
export const themeScript = `(() => {
  const key = "${THEME_STORAGE_KEY}";
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const apply = () => {
    let theme = "system";
    try { theme = localStorage.getItem(key) || "system"; } catch {}
    const dark = theme === "dark" || (theme === "system" && media.matches);
    document.documentElement.classList.toggle("dark", dark);
  };
  apply();
  media.addEventListener("change", apply);
  window.addEventListener("storage", (event) => { if (event.key === key) apply(); });
})();`
