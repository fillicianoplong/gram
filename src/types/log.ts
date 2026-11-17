import type { FoodFields } from "./food";

export type Log = FoodFields & {
  id: string;
  foodId: string;
  loggedAt: string;
  quantity: string;
};
