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

export async function addLogFromFood(food: Food): Promise<Log> {
  const logs = await getLogs();
  const log: Log = {
    ...food,
    id: Date.now().toString(),
    date: new Date().toLocaleDateString(),
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
