import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Form } from "@/types/form";
import type { Food } from "@/types/food";

const KEY = "foods";

export async function getFoods(): Promise<Food[]> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) {
    return [];
  }

  const parsed: unknown = JSON.parse(raw);
  return Array.isArray(parsed) ? (parsed as Food[]) : [];
}

export async function addFood(form: Form): Promise<Food> {
  const foods = await getFoods();
  const food: Food = { ...form, id: Date.now().toString() };
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
