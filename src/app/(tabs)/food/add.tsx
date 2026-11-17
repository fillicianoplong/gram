import { addFood } from "@/storage/foods";
import { colors } from "@/theme";
import { createEmptyFoodInput, foodFields } from "@/types/food";
import { router, useNavigation } from "expo-router";
import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function AddFoodScreen() {
  const navigation = useNavigation();
  const [foodInput, setFoodInput] = useState(createEmptyFoodInput);

  const onSave = useCallback(async () => {
    if (!foodInput.name.trim() || !foodInput.energy.trim()) {
      Alert.alert("Missing fields", "Name and energy are required.");
      return;
    }

    try {
      await addFood(foodInput);
      setFoodInput(createEmptyFoodInput());
      router.back();
    } catch {
      Alert.alert("Error", "Failed to save food.");
    }
  }, [foodInput]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={onSave} hitSlop={8}>
          <Text style={styles.saveText}>Save</Text>
        </Pressable>
      ),
    });
  }, [navigation, onSave]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <View style={styles.form}>
        {foodFields.map((field) => (
          <View key={field.field} style={styles.formGroup}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              style={styles.input}
              placeholder={field.placeholder}
              placeholderTextColor={colors.muted}
              value={foodInput[field.field]}
              onChangeText={(text) => setFoodInput((prev) => ({ ...prev, [field.field]: text }))}
              keyboardType={field.keyboardType}
            />
          </View>
        ))}
      </View>
      <View style={styles.buttons}>
        <Pressable
          onPress={() => setFoodInput(createEmptyFoodInput())}
          style={styles.clearButton}
        >
          <Text style={styles.clearText}>Clear</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: 10,
  },
  form: {
    width: "100%",
  },
  formGroup: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  label: {
    color: colors.text,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: colors.text,
    textAlign: "right",
  },
  buttons: {
    flexDirection: "column",
    gap: 10,
    paddingTop: 10,
    paddingBottom: 260,
  },
  clearButton: {
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  clearText: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "600",
  },
  saveText: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: "600",
  },
});
