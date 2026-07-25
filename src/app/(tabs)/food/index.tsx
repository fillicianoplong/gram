import { router, useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { deleteFood, getFoods } from "@/storage/foods";
import type { Food } from "@/types/food";
import Ionicons from "@expo/vector-icons/Ionicons";

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
            <Text style={styles.foodName}>{item.name}</Text>
            <Pressable onPress={() => onDelete(item.id)}>
              <Ionicons name="trash-bin" size={20} color="#ff8171" />
            </Pressable>
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
    backgroundColor: "#25292e",
    padding: 10,
  },
  emptyText: {
    color: "#888",
    textAlign: "center",
  },
  headerAction: {
    marginRight: 16,
    color: "#ffd33d",
    fontSize: 17,
    fontWeight: "600",
  },
  foodItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#444",
  },
  foodName: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  foodEnergy: {
    color: "#888",
    fontSize: 15,
  },
  deleteText: {
    color: "#ff8171",
    fontSize: 15,
    fontWeight: "600",
  },
});
