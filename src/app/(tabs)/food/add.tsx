import { useNavigation } from "expo-router";
import { useCallback, useLayoutEffect, useState } from "react";
import { Button, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const formFields = [
  {field: "name", label: "Name", placeholder: "Required", keyboardType: "default"},
  {field: "energy", label: "Energy (kcal)", placeholder: "Required", keyboardType: "decimal-pad"},
  {field: "protein", label: "Protein (g)", placeholder: "Optional", keyboardType: "decimal-pad"},
  {field: "fat", label: "Fat (g)", placeholder: "Optional", keyboardType: "decimal-pad"},
  {field: "saturated", label: "Saturated (g)", placeholder: "Optional", keyboardType: "decimal-pad"},
  {field: "trans", label: "Trans (g)", placeholder: "Optional", keyboardType: "decimal-pad"},
  {field: "cholesterol", label: "Cholesterol (mg)", placeholder: "Optional", keyboardType: "decimal-pad"},
  {field: "sodium", label: "Sodium (mg)", placeholder: "Optional", keyboardType: "decimal-pad"},
  {field: "carbs", label: "Carbs (g)", placeholder: "Optional", keyboardType: "decimal-pad"},
  {field: "fiber", label: "Fiber (g)", placeholder: "Optional", keyboardType: "decimal-pad"},
  {field: "sugars", label: "Sugars (g)", placeholder: "Optional", keyboardType: "decimal-pad"},
  {field: "addedSugars", label: "Added Sugars (g)", placeholder: "Optional", keyboardType: "decimal-pad"},
  {field: "vitaminD", label: "Vitamin D (mcg)", placeholder: "Optional", keyboardType: "decimal-pad"},
  {field: "calcium", label: "Calcium (mg)", placeholder: "Optional", keyboardType: "decimal-pad"},
  {field: "iron", label: "Iron (mg)", placeholder: "Optional", keyboardType: "decimal-pad"},
  {field: "potassium", label: "Potassium (mg)", placeholder: "Optional", keyboardType: "decimal-pad"},
] as const;

type Form = {
  [key in (typeof formFields)[number]["field"]]: string;
}

function createEmptyForm(): Form {
  return Object.fromEntries(
    formFields.map((field) => [field.field, ""])
  ) as Form;
}

export default function AddFoodScreen() {
  const navigation = useNavigation();
  const [form, setForm] = useState(createEmptyForm);

  const onSave = useCallback(() => {
    console.log(form);
  }, [form]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={onSave} hitSlop={8} style={styles.saveButton}>
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
    justifyContent: "center",
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
  saveButton: {
    marginRight: 16,
  },
  saveText: {
    color: "#ffd33d",
    fontSize: 17,
    fontWeight: "600",
  },
});
