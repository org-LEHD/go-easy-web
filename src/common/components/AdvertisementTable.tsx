import { NavLink, Table } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";

interface AdvertisementTableProps {
  advertisements: any[];
}

export const AdvertisementTable: React.FC<AdvertisementTableProps> = ({
  advertisements,
}) => {
  if (!advertisements.length)
    return <div>Du har ikke oprettet nogen annoncer endnu</div>;
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
            <td>{advertisement.title}</td>
            <td>{`${advertisement.start.getUTCDate()}/${advertisement.start.getUTCMonth()+1} ${advertisement.start.getHours()}:${advertisement.start.getMinutes()}`}</td>
            <td>{`${advertisement.end.getUTCDate()}/${advertisement.end.getUTCMonth()+1} ${advertisement.start.getHours()}:${advertisement.start.getMinutes()}`}</td>
            <td>{advertisement.location.name}</td>
            <td>{`${advertisement.createdAt.getUTCDate()}/${advertisement.createdAt.getUTCMonth()+1}/${advertisement.createdAt.getFullYear()}`}</td>
            <td>
              <NavLink
                href={`/advertisement/${advertisement.id}`}
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
