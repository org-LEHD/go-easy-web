import { NavLink, Table, Select } from "@mantine/core";
import { Role } from "@prisma/client";
import { IconArrowRight } from "@tabler/icons";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Login from "~/pages/login";
import { api } from "~/utils/api";
import {
  type AccessEnumKeys,
  mapAccessEnumToObject,
} from "~/utils/mapAccessEnumToObject";
import { useRouter } from "next/router";

interface UserTableProps {
  users: any[];
}

export const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const [value, setValue] = useState<string | null>(null);
  const { mutate: updateMutation } = api.user.updateAccess.useMutation({
    onSuccess: () => router.reload(),
  });

  if (!users.length) return <div>Der findes ingen brugere her</div>;
  if (sessionData?.user === undefined) return <Login />;

  const setAccessValue = (item: AccessEnumKeys, userId: number) => {
    if (!item) return;
    updateMutation({
      id: userId,
      access: item,
    });
    setValue(item);
  };
  return (
    <Table>
      <thead>
        <tr>
          <th>Navn</th>
          <th>Email</th>
          <th>Role</th>
          <th>Access</th>
          <th>Oprettet</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user, key) => (
          <tr key={key}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <Select
                placeholder="Giv adgang"
                mt="sm"
                value={value}
                onChange={(item: AccessEnumKeys) =>
                  setAccessValue(item, user.id)
                }
                data={mapAccessEnumToObject(["Pending"])}
              />
            </td>
            <td>
              {sessionData.user.role === Role.Administrator
                ? "You are an admin tho"
                : user.access}
            </td>
            <td>{`${user.createdAt.getDate()}/${user.createdAt.getMonth()}/${user.createdAt.getFullYear()}`}</td>
            <td>
              <NavLink
                href={`/request/${user.id}`}
                component="a"
                icon={<IconArrowRight color="blue" />}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
