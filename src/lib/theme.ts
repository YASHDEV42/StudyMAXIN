/**
 * Colour theme preference. "system" follows `prefers-color-scheme`; an explicit
 * choice is stored locally (no account, no server) and applied as
 * `<html data-theme>` by `themeScript` before first paint.
 */
export const themeStorageKey = "studylike-theme";
export const themes = ["system", "light", "dark"] as const;
export type ThemePreference = (typeof themes)[number];

/** Inline, render-blocking and tiny on purpose: it runs before the body paints. */
export const themeScript = `(function(){try{var t=localStorage.getItem("${themeStorageKey}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})();`;

export function readThemePreference(): ThemePreference {
  try {
    const value = localStorage.getItem(themeStorageKey);
    return value === "light" || value === "dark" ? value : "system";
  } catch {
    return "system";
  }
}

export function applyThemePreference(preference: ThemePreference) {
  const root = document.documentElement;
  try {
    if (preference === "system") localStorage.removeItem(themeStorageKey);
    else localStorage.setItem(themeStorageKey, preference);
  } catch {
    // Storage may be unavailable (private mode); the choice still applies now.
  }
  if (preference === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", preference);
  window.dispatchEvent(new Event("studylike-theme"));
}
