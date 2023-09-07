import { NavLink, Table, Anchor, Text, Tooltip } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import { formatDate } from "~/utils/dateFormatter";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Login from "~/pages/login";

interface LocationTableProps {
  locations: any[];
}

export const LocationTable: React.FC<LocationTableProps> = ({
  locations = [],
}) => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  if (sessionData?.user === undefined) return <Login />;
  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Forretning</th>
          <th>Telefon</th>
          <th>Addresse</th>
          <th>Hjemmeside</th>
          <th>Thumbnail</th>
          <th>Oprettet</th>
          <th>Annoncer</th>
        </tr>
      </thead>
      <tbody>
        {locations?.map((location, key) => (
          <tr key={key}>
            <td>{location.id}</td>
            <td style={{ maxWidth: 100 }}>
              <Tooltip label={location.name}>
                <Text truncate>{location.name}</Text>
              </Tooltip>
            </td>
            <td>{location.phone}</td>
            <td style={{ maxWidth: 200 }}>
              <Tooltip label={location.address}>
                <Text truncate>{location.address}</Text>
              </Tooltip>
            </td>
            <td style={{ maxWidth: 200 }}>
              <Anchor href={location.website} target={"_blank"}>
                <Tooltip label={location.website}>
                  <Text truncate>{location.website}</Text>
                </Tooltip>
              </Anchor>
            </td>
            <td style={{ maxWidth: 200 }}>
              <Anchor href={location.thumbnail} target={"_blank"}>
                <Tooltip label={location.thumbnail}>
                  <Text truncate>{location.thumbnail}</Text>
                </Tooltip>
              </Anchor>
            </td>
            <td>{`${formatDate(location.createdAt)}`}</td>
            <td>
              <NavLink
                href={
                  router.asPath.startsWith("/location")
                    ? `/location/${location.id}`
                    : `/advertiser/locations/${location.id}`
                }
                component="a"
                icon={<IconArrowRight color="blue" />}
              />
            </td>
          </tr>
        ))}
        {locations?.length === 0 && (
          <tr>
            <td colSpan={5}>Brugeren har endnu ikke oprettet lokationer.</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};
