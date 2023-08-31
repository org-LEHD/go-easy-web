import { NavLink, Table } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import { formatDate, formatDateTime } from "~/utils/dateFormatter";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface AdvertisementTableProps {
  advertisements: any[];
}

export const AdvertisementTable: React.FC<AdvertisementTableProps> = ({
  advertisements,
}) => {
  const router = useRouter();
  const isAdvertiserPage = router.asPath.startsWith('/advertiser/locations')
  // const { data: sessionData } = useSession();
  // const isAdmin = sessionData?.user.role === "Administrator";

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
          {!isAdvertiserPage && <th> </th>}
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
            {!isAdvertiserPage && <td>
              <NavLink
                href={`/advertisement/${advertisement.id}`}
                component="a"
                icon={<IconArrowRight color="blue" />}
              />
            </td>}
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
