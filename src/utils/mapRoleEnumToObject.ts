import { Role } from "@prisma/client";

type RoleEnumKeys = keyof typeof Role;

export function mapRoleEnumToObject(
  exclude: RoleEnumKeys[] = []
): { value: Role; label: string }[] {
  const roleValues = Object.values(Role);
  const roleMap = roleValues
    .filter((value) => !exclude.includes(value))
    .map((value) => ({
      value,
      label: value,
    }));
  return roleMap;
}
