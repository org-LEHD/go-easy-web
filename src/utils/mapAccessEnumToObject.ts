import { Access } from "@prisma/client";

export type AccessEnumKeys = keyof typeof Access;

export function mapAccessEnumToObject(
  exclude: AccessEnumKeys[] = []
): { value: Access; label: string }[] {
  const accessValues = Object.values(Access);
  const accessMap = accessValues
    .filter((value) => !exclude.includes(value))
    .map((value) => ({
      value,
      label: value,
    }));
  return accessMap;
}
