export const formFields = [
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

export type Form = {
  [key in (typeof formFields)[number]["field"]]: string;
};

export function createEmptyForm(): Form {
  return Object.fromEntries(
    formFields.map((field) => [field.field, ""])
  ) as Form;
}
