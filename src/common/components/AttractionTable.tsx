import { NavLink, Table } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import { formatDate } from "~/utils/dateFormatter";

interface AttractionTableProps {
  attractions: any[];
}

export const AttractionTable: React.FC<AttractionTableProps> = ({
  attractions,
}) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Navn</th>
          <th>Oprettet</th>
          <th>Opdateret</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {attractions?.map((attraction, key) => (
          <tr key={key}>
            <td>{attraction.id}</td>
            <td>{attraction.name}</td>
            <td>{`${formatDate(attraction.createdAt)}`}</td>
            <td>{`${formatDate(attraction.updatedAt)}`}</td>
            <td>
              <NavLink
                href={`/attraction/${attraction.id}`}
                component="a"
                icon={<IconArrowRight color="blue" />}
              />
            </td>
          </tr>
        ))}
        {attractions?.length === 0 && (
          <tr>
            <td colSpan={5}>Der findes ingen seværdighedder her</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};
