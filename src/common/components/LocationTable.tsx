/* eslint-disable prefer-const */
import { NavLink, Table } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";

interface LocationTableProps {
  locations: any[];
}

export const LocationTable: React.FC<LocationTableProps> = ({ locations }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Forretning</th>
          <th>Website</th>
          <th>Oprettet</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {locations?.map((location, key) => (
          <tr key={key}>
            <td>{location.id}</td>
            <td>{location.name}</td>
            <td>{location.website}</td>
            <td>{`${location.createdAt.getDate()}/${location.createdAt.getMonth()}/${location.createdAt.getFullYear()}`}</td>
            <td>
              <NavLink
                href={`/location/${location.id}`}
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
