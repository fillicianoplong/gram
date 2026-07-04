import { DarkTheme, type Theme } from "expo-router/react-navigation";

export const backgroundColor = "#25292e";

export const navigationTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#ffd33d",
    background: backgroundColor,
    card: backgroundColor,
    text: "#ffffff",
    border: "#444444",
  },
};
