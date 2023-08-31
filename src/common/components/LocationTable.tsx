import { NavLink, Table } from "@mantine/core";
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
            <td colSpan={5}>Brugeren har endnu ikke oprettet annoncer.</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};
