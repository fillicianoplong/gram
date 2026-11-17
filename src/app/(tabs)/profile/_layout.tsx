import { Stack } from "expo-router";

import { colors } from "@/theme";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "Profile",
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
