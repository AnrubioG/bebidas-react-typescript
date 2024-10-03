import { z } from "zod";
import {
  CategoriesAPIResponseSchema,
  DrinksAPIResponseSchema,
  SerachFilterSchema,
} from "./utils/recipes-schema";

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>;
export type SerachFilter = z.infer<typeof SerachFilterSchema>;
export type Drinks = z.infer<typeof DrinksAPIResponseSchema>;
