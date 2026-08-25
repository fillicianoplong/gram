export const foodFields = [
  { field: "name", label: "Name", placeholder: "Required", keyboardType: "default" },
  { field: "brand", label: "Brand", placeholder: "Optional", keyboardType: "default" },
  { field: "servingSize", label: "Serving Size", placeholder: "Optional", keyboardType: "default" },
  { field: "servingWeight", label: "Serving Weight (g)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "servingsPerContainer", label: "Servings Per Container", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "weight", label: "Package Weight (g)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "energy", label: "Energy (kcal)", placeholder: "Required", keyboardType: "decimal-pad" },
  { field: "fat", label: "Fat (g)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "saturated", label: "Saturated Fat (g)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "trans", label: "Trans Fat (g)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "polyunsaturated", label: "Polyunsaturated Fat (g)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "monounsaturated", label: "Monounsaturated Fat (g)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "cholesterol", label: "Cholesterol (mg)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "sodium", label: "Sodium (mg)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "carbs", label: "Carbs (g)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "fiber", label: "Fiber (g)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "sugars", label: "Sugars (g)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "addedSugars", label: "Added Sugars (g)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "protein", label: "Protein (g)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "vitaminD", label: "Vitamin D (mcg)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "calcium", label: "Calcium (mg)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "iron", label: "Iron (mg)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "potassium", label: "Potassium (mg)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "vitaminA", label: "Vitamin A (mcg)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "vitaminC", label: "Vitamin C (mg)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "vitaminE", label: "Vitamin E (mg)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "vitaminK", label: "Vitamin K (mcg)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "thiamin", label: "Thiamin (mg)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "riboflavin", label: "Riboflavin (mg)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "niacin", label: "Niacin (mg)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "vitaminB6", label: "Vitamin B6 (mg)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "folate", label: "Folate (mcg)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "vitaminB12", label: "Vitamin B12 (mcg)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "biotin", label: "Biotin (mcg)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "pantothenicAcid", label: "Pantothenic Acid (mg)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "phosphorus", label: "Phosphorus (mg)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "iodine", label: "Iodine (mcg)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "magnesium", label: "Magnesium (mg)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "zinc", label: "Zinc (mg)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "selenium", label: "Selenium (mcg)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "copper", label: "Copper (mg)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "manganese", label: "Manganese (mg)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "chromium", label: "Chromium (mcg)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "molybdenum", label: "Molybdenum (mcg)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "chloride", label: "Chloride (mg)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "choline", label: "Choline (mg)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "caffeine", label: "Caffeine (mg)", placeholder: "Optional", keyboardType: "decimal-pad" },
  { field: "alcohol", label: "Alcohol (g)", placeholder: "Optional", keyboardType: "decimal-pad" },
] as const;

export type FoodFields = {
  [key in (typeof foodFields)[number]["field"]]: string;
};

export type Food = FoodFields & { id: string };

export type FoodInput = FoodFields;

export function createEmptyFoodInput(): FoodInput {
  return Object.fromEntries(foodFields.map((field) => [field.field, ""])) as FoodInput;
}
