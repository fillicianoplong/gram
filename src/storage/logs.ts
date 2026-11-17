import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Food } from "@/types/food";
import type { Log } from "@/types/log";

const KEY = "logs";

export async function getLogs(): Promise<Log[]> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) {
    return [];
  }

  const parsed: unknown = JSON.parse(raw);
  return Array.isArray(parsed) ? (parsed as Log[]) : [];
}

export async function addLogFromFood(food: Food, quantity = "1"): Promise<Log> {
  const logs = await getLogs();
  const { id: foodId, ...fields } = food;
  const log: Log = {
    ...fields,
    id: Date.now().toString(),
    foodId,
    loggedAt: new Date().toISOString(),
    quantity,
  };
  await AsyncStorage.setItem(KEY, JSON.stringify([...logs, log]));
  return log;
}

export async function deleteLog(id: string): Promise<void> {
  const logs = await getLogs();
  await AsyncStorage.setItem(
    KEY,
    JSON.stringify(logs.filter((log) => log.id !== id))
  );
}
