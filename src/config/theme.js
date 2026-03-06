const STORAGE_KEY = "weddingTheme";

export const defaultTheme = {
  green: "#7A8E7F",
  greenLight: "#8A9E8F",
  greenDark: "#6A7E6F",
  gold: "#D4993D",
  goldLight: "#E8C84A",
  orange: "#E87A4A",
  cream: "#FFF5E6",
  creamLight: "#FFFAF2",
  creamDark: "#FFF0DC",
  floralPink: "#E8508A",
  floralBlue: "#4A7EC8",
  textMuted: "#999999",
  textDark: "#5A5A5A",
};

const varMap = {
  green: "--theme-green",
  greenLight: "--theme-green-light",
  greenDark: "--theme-green-dark",
  gold: "--theme-gold",
  goldLight: "--theme-gold-light",
  orange: "--theme-orange",
  cream: "--theme-cream",
  creamLight: "--theme-cream-light",
  creamDark: "--theme-cream-dark",
  floralPink: "--theme-floral-pink",
  floralBlue: "--theme-floral-blue",
  textMuted: "--theme-text-muted",
  textDark: "--theme-text-dark",
};

export const getTheme = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...defaultTheme, ...JSON.parse(stored) };
  } catch {
    // ignore
  }
  return { ...defaultTheme };
};

export const applyTheme = (overrides) => {
  const theme = overrides || getTheme();
  const root = document.documentElement;
  for (const [key, cssVar] of Object.entries(varMap)) {
    if (theme[key]) {
      root.style.setProperty(cssVar, theme[key]);
    }
  }
};

export const saveTheme = (theme) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
  applyTheme(theme);
};

export const resetTheme = () => {
  localStorage.removeItem(STORAGE_KEY);
  applyTheme(defaultTheme);
};
