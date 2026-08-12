import { addFood } from "@/storage/foods";
import { colors } from "@/theme";
import { createEmptyForm, formFields } from "@/types/form";
import { router, useNavigation } from "expo-router";
import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function AddFoodScreen() {
  const navigation = useNavigation();
  const [form, setForm] = useState(createEmptyForm);

  const onSave = useCallback(async () => {
    if (!form.name.trim() || !form.energy.trim()) {
      Alert.alert("Missing fields", "Name and energy are required.");
      return;
    }

    try {
      await addFood(form);
      setForm(createEmptyForm());
      router.back();
    } catch {
      Alert.alert("Error", "Failed to save food.");
    }
  }, [form]);

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
        {formFields.map((field) => (
          <View key={field.field} style={styles.formGroup}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              style={styles.input}
              placeholder={field.placeholder}
              placeholderTextColor={colors.muted}
              value={form[field.field]}
              onChangeText={(text) => setForm((prev) => ({ ...prev, [field.field]: text }))}
              keyboardType={field.keyboardType}
            />
          </View>
        ))}
      </View>
      <View style={styles.buttons}>
        <Pressable
          onPress={() => setForm(createEmptyForm())}
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
