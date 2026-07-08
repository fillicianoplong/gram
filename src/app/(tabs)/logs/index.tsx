import { router, useNavigation } from "expo-router";
import { useCallback, useLayoutEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function LogsListScreen() {
  const navigation = useNavigation();

  const onAdd = useCallback(() => {
    router.push("/food");
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={onAdd} hitSlop={8} style={styles.headerButton}>
          <Text style={styles.headerAction}>Add</Text>
        </Pressable>
      ),
    });
  }, [navigation, onAdd]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.emptyText}>No logs yet. Tap Add to create one.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    padding: 10,
  },
  emptyText: {
    color: "#888",
    textAlign: "center",
  },
  headerButton: {
    
  },
  headerAction: {
    color: "#ffd33d",
    fontSize: 17,
    fontWeight: "600",
  },
});
