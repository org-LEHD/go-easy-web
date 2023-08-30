import { NavLink, Table, Select } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import { useSession } from "next-auth/react";
import Login from "~/pages/login";
import { api } from "~/utils/api";
import {
  type AccessEnumKeys,
  mapAccessEnumToObject,
} from "~/utils/mapAccessEnumToObject";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { RoleEnumKeys, mapRoleEnumToObject } from "~/utils/mapRoleEnumToObject";

interface UserTableProps {
  users: any[];
}

export const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const pathName = usePathname();
  const isRequestPage = pathName === "/requests";

  const { mutate: updateAccessMutation } = api.user.updateAccess.useMutation({
    onSuccess: () => router.reload(),
  });
  const { mutate: updateRoleMutation } = api.user.updateRole.useMutation();

  const setAccessValue = (item: AccessEnumKeys, userId: number) => {
    if (!item) return;
    updateAccessMutation({
      id: userId,
      access: item,
    });
  };
  const setRoleValue = (item: RoleEnumKeys, userId: number) => {
    if (!item) return;
    updateRoleMutation({
      id: userId,
      role: item,
    });
    updateAccessMutation({
      id: userId,
      access: "Granted",
    });
  };

  if (sessionData?.user === undefined) return <Login />;
  return (
    <Table>
      <thead>
        <tr>
          <th>Navn</th>
          <th>Email</th>
          <th>Role</th>
          <th>Access</th>
          <th>Oprettet</th>
          {!isRequestPage && <th> Lokationer </th>}
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users?.map((user, key) => (
            <tr key={key}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Select
                  placeholder="Giv adgang"
                  mt="sm"
                  defaultValue={user.role}
                  onChange={(item: RoleEnumKeys) => setRoleValue(item, user.id)}
                  data={mapRoleEnumToObject()}
                />
              </td>
              <td>
                <Select
                  placeholder="Giv adgang"
                  mt="sm"
                  defaultValue={user.access}
                  onChange={(item: AccessEnumKeys) =>
                    setAccessValue(item, user.id)
                  }
                  data={mapAccessEnumToObject(
                    pathName === "/requests"
                      ? ["Disabled"]
                      : ["Pending", "Denied"]
                  )}
                />
              </td>
              <td>{`${user.createdAt.getDate()}/${user.createdAt.getMonth()}/${user.createdAt.getFullYear()}`}</td>
              <td>
                {!isRequestPage && user.role !== "Administrator" && (
                  <NavLink
                    href={`/advertiser/${user.id}`}
                    component="a"
                    icon={<IconArrowRight color="blue" />}
                  />
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={isRequestPage ? 5 : 6}>
              {isRequestPage
                ? `Der er endnu ikke nogle benægtede annoncøre her`
                : `Der er endnu ikke nogle deaktiverede annoncøre her`}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};
