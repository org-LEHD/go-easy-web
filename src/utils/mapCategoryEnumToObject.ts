import { Category } from "@prisma/client";

export function mapCategoryEnumToObjects() {
  const categoryValues = Object.values(Category);
  const categoryMap = categoryValues.map((value) => ({
    value: Category[value],
    label: value,
  }));
  return categoryMap.slice(1); // Exclude the "Undefined" category if desired
}