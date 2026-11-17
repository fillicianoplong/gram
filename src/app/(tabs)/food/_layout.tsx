import { Stack } from "expo-router";

import { colors } from "@/theme";

const stackScreenOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: colors.background,
  },
  headerShadowVisible: false,
  headerTintColor: colors.text,
  headerTitleStyle: {
    fontWeight: "bold" as const,
  },
  contentStyle: {
    backgroundColor: colors.background,
  },
  headerRightContainerStyle: {
    paddingRight: 16,
  },
};

export default function FoodLayout() {
  return (
    <Stack
      screenOptions={({ route }) => ({
        ...stackScreenOptions,
        title: route.name === "add" ? "Add Food" : "Food",
      })}
    />
  );
}
