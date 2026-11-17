import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { deleteFood, getFoods } from "@/storage/foods";
import { addLogFromFood } from "@/storage/logs";
import { colors } from "@/theme";
import type { Food } from "@/types/food";

export default function FoodListScreen() {
  const navigation = useNavigation();
  const [foods, setFoods] = useState<Food[]>([]);

  useFocusEffect(
    useCallback(() => {
      getFoods().then(setFoods);
    }, [])
  );

  const onAdd = useCallback(() => {
    router.push("/food/add");
  }, []);

  const onDelete = useCallback((id: string) => {
    Alert.alert("Delete food?", "This cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteFood(id);
            setFoods((prev) => prev.filter((food) => food.id !== id));
          } catch {
            Alert.alert("Error", "Failed to delete food.");
          }
        },
      },
    ]);
  }, []);

  const onLog = useCallback(async (food: Food) => {
    try {
      await addLogFromFood(food);
      Alert.alert("Log added", "The food has been logged successfully.");
    } catch {
      Alert.alert("Error", "Failed to add log.");
    }
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={onAdd} hitSlop={8}>
          <Text style={styles.headerAction}>Add</Text>
        </Pressable>
      ),
    });
  }, [navigation, onAdd]);

  return (
    <View style={styles.container}>
      <FlatList
        data={foods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.foodItem}>
            <View style={styles.content}>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.energy}>{item.energy} kcal</Text>
            </View>
            <View style={styles.actions}>
              <Pressable onPress={() => onLog(item)} hitSlop={8}>
                <Ionicons name="add" size={22} color={colors.primary} />
              </Pressable>
              <Pressable onPress={() => onDelete(item.id)} hitSlop={8}>
                <Ionicons name="trash-outline" size={20} color={colors.muted} />
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No foods yet. Tap Add to create one.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10,
  },
  emptyText: {
    color: colors.muted,
    textAlign: "center",
  },
  headerAction: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: "600",
  },
  foodItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: colors.surface,
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  foodName: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "600",
  },
  energy: {
    color: colors.muted,
    fontSize: 14,
    marginTop: 2,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
});
