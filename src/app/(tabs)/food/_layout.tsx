import { Stack } from "expo-router";

import { backgroundColor } from "@/theme";

const stackScreenOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor,
  },
  headerShadowVisible: false,
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold" as const,
  },
  contentStyle: {
    backgroundColor,
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
