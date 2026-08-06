import { addFood } from "@/storage/foods";
import { createEmptyForm, formFields } from "@/types/form";
import { router, useNavigation } from "expo-router";
import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, Button, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

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
              placeholderTextColor="#888"
              value={form[field.field]}
              onChangeText={(text) => setForm((prev) => ({ ...prev, [field.field]: text }))}
              keyboardType={field.keyboardType}
            />
          </View>
        ))}
      </View>
      <View style={styles.buttons}>
        <Button title="Clear" onPress={() => setForm(createEmptyForm())} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  content: {
    flexGrow: 1,
    backgroundColor: "#25292e",
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
    borderBottomColor: "#444",
  },
  label: {
    color: "#fff",
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: "#fff",
    textAlign: "right",
  },
  buttons: {
    flexDirection: "column",
    gap: 10,
    paddingTop: 10,
    paddingBottom: 260,
  },
  saveText: {
    color: "#ffd33d",
    fontSize: 17,
    fontWeight: "600",
  },
});
