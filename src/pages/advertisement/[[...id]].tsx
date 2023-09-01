import { useSession } from "next-auth/react";
import Login from "../login";
import { Box } from "@mantine/core";
import { api } from "~/utils/api";
import AdvertisementForm from "~/common/components/AdvertisementForm";
import { useRouter } from "next/router";

const Advertisement: React.FC = ({}) => {
  const { data: sessionData } = useSession();

  const routerInfo = useRouter();
  const { id } = routerInfo.query;
  const routerParam = id?.[0] !== undefined ? Number(id[0]) : 0;

  const { data } = api.advertisement.getById.useQuery(routerParam);

  if (!data) return <></>;

  if (sessionData?.user === undefined) {
    return <Login />;
  }
  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      {data && <AdvertisementForm data={data} />}
    </Box>
  );
};

export default Advertisement;
