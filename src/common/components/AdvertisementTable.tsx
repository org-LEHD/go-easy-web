import { NavLink, Table, Tooltip, Text, Anchor } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import { formatDate, formatDateTime } from "~/utils/dateFormatter";
import { useRouter } from "next/router";

interface AdvertisementTableProps {
  advertisements: any[];
}

export const AdvertisementTable: React.FC<AdvertisementTableProps> = ({
  advertisements,
}) => {
  const router = useRouter();
  const isAdvertiserPage = router.asPath.startsWith("/advertiser/locations");

  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Navn</th>
          <th>Forretning</th>
          <th>Beskrivelse</th>
          <th>Medie</th>
          <th>Start</th>
          <th>Slut</th>
          <th>Oprettet</th>
          <th>Sidst ændret</th>
          {!isAdvertiserPage && <th> </th>}
        </tr>
      </thead>
      <tbody>
        {advertisements?.map((advertisement, key) => (
          <tr key={key}>
            <td>{advertisement.id}</td>
            <td>{advertisement.title}</td>
            <td>{advertisement.location.name}</td>
            <td style={{ maxWidth: 200 }}>
              <Tooltip label={advertisement.description}>
                <Text truncate>{advertisement.description}</Text>
              </Tooltip>
            </td>
            <td style={{ maxWidth: 200 }}>
              <Anchor href={advertisement.media} target={"_blank"}>
                <Tooltip label={advertisement.media}>
                  <Text truncate>{advertisement.media}</Text>
                </Tooltip>
              </Anchor>
            </td>
            <td>{`${formatDateTime(advertisement.start)}`}</td>
            <td>{`${formatDateTime(advertisement.end)}`}</td>
            <td>{`${formatDate(advertisement.createdAt)}`}</td>
            <td>{`${formatDate(advertisement.updatedAt)}`}</td>
            {!isAdvertiserPage && (
              <td>
                <NavLink
                  href={`/advertisement/${advertisement.id}`}
                  component="a"
                  icon={<IconArrowRight color="blue" />}
                />
              </td>
            )}
          </tr>
        ))}
        {advertisements?.length === 0 && (
          <tr>
            <td colSpan={5}>Denne lokation har endnu ingen annoncer.</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};
