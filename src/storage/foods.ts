import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Food, FoodInput } from "@/types/food";

const KEY = "foods";

export async function getFoods(): Promise<Food[]> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) {
    return [];
  }

  const parsed: unknown = JSON.parse(raw);
  return Array.isArray(parsed) ? (parsed as Food[]) : [];
}

export async function addFood(input: FoodInput): Promise<Food> {
  const foods = await getFoods();
  const food: Food = { ...input, id: Date.now().toString() };
  await AsyncStorage.setItem(KEY, JSON.stringify([...foods, food]));
  return food;
}

export async function deleteFood(id: string): Promise<void> {
  const foods = await getFoods();
  await AsyncStorage.setItem(
    KEY,
    JSON.stringify(foods.filter((food) => food.id !== id))
  );
}
