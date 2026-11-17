import { Stack } from "expo-router";

import { colors } from "@/theme";

export default function LogsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "Logs",
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerShadowVisible: false,
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    />
  );
}
