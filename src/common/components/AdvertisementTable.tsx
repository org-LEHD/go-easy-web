/* eslint-disable prefer-const */
import { NavLink, Table } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";

interface AdvertisementTableProps {
  advertisements: any[];
}

export const AdvertisementTable: React.FC<AdvertisementTableProps> = ({
  advertisements,
}) => {
  if (!advertisements.length) return <div>Du har ikke oprettet nogen annoncer endnu</div>;
  return (
    <Table>
      <thead>
        <tr>
          <th>AnnonceID</th>
          <th>Navn</th>
          <th>Start</th>
          <th>Slut</th>
          <th>Forretning</th>
          <th>Oprettet</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {advertisements?.map((advertisement, key) => (
          <tr key={key}>
            <td>{advertisement.id}</td>
            <td>{advertisement.name}</td>
            <td>{`${advertisement.start.getDate()}/${advertisement.start.getMonth()}}`}</td>
            <td>{`${advertisement.slut.getDate()}/${advertisement.slut.getMonth()}}`}</td>
            <td>{advertisement.location.name}</td>
            <td>{`${advertisement.slut.getDate()}/${advertisement.createdAt.getMonth()}/${advertisement.createdAt.getMonth()}}`}</td>
            <td>
              <NavLink
                href={`/location/${advertisement.location.id}`}
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
