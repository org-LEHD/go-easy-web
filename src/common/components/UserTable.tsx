/* eslint-disable prefer-const */
import { NavLink, Table } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";

interface UserTableProps {
  users: any[];
}

export const UserTable: React.FC<UserTableProps> = ({ users }) => {
  if (!users.length) return <div>Der findes ingen brugere her</div>;
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
            <td>{user.access}</td>
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
