import { NavLink, Table } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import { start } from "repl";
import { formatDate, formatDateTime } from "~/utils/dateFormatter";

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
          <th>Forretning</th>
          <th>Start</th>
          <th>Slut</th>
          <th>Oprettet</th>
          <th>Sidst ændret</th>

          <th> </th>
        </tr>
      </thead>
      <tbody>
        {advertisements?.map((advertisement, key) => (
          <tr key={key}>
            <td>{advertisement.id}</td>
            <td>{advertisement.title}</td>
            <td>{advertisement.location.name}</td>
            <td>{`${formatDateTime(advertisement.start)}`}</td>
            <td>{`${formatDateTime(advertisement.end)}`}</td>
            <td>{`${formatDate(advertisement.createdAt)}`}</td>
            <td>{`${formatDate(advertisement.updatedAt)}`}</td>
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
