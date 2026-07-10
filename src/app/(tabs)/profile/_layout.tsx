import { Stack } from "expo-router";

import { backgroundColor } from "@/theme";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "Profile",
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
