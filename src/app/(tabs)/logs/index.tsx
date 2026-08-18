import { deleteLog, getLogs } from "@/storage/logs";
import { colors } from "@/theme";
import type { Log } from "@/types/log";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function LogsListScreen() {
  const [logs, setLogs] = useState<Log[]>([]);

  useFocusEffect(
    useCallback(() => {
      getLogs().then(setLogs);
    }, [])
  );

  const onDelete = useCallback((id: string) => {
    Alert.alert("Delete log?", "This cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteLog(id);
            setLogs((prev) => prev.filter((log) => log.id !== id));
          } catch {
            Alert.alert("Error", "Failed to delete log.");
          }
        },
      },
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.logItem}>
            <Text style={styles.logName}>{item.name}</Text>
            <Pressable onPress={() => onDelete(item.id)} hitSlop={8}>
              <Ionicons name="trash-outline" size={20} color={colors.muted} />
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No logs yet. Tap + on a food to log it.</Text>
        }
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
  logItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: colors.surface,
  },
  logName: {
    flex: 1,
    color: colors.text,
    fontSize: 17,
    fontWeight: "600",
  },
});
