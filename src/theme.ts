import { DarkTheme, type Theme } from "expo-router/react-navigation";

export const colors = {
  background: "#1E1E1E",
  surface: "#252526",
  primary: "#3794FF",
  onPrimary: "#FFFFFF",
  text: "#CCCCCC",
  muted: "#858585",
  border: "#454545",
  destructive: "#F48771",
  tabBar: "#252526",
  tabBarInactive: "#858585",
} as const;

export const navigationTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
  },
};
