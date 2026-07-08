import { Stack } from "expo-router";

import { backgroundColor } from "@/theme";

export default function LogsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "Logs",
        headerStyle: {
          backgroundColor,
        },
        headerShadowVisible: false,
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        contentStyle: {
          backgroundColor,
        },
      }}
    />
  );
}
