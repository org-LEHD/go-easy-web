import { useSession } from "next-auth/react";
import Login from "../login";
import { Box, LoadingOverlay, Flex } from "@mantine/core";
import { api } from "~/utils/api";
import LocationForm from "~/common/components/LocationForm";
import { useRouter } from "next/router";
import { AdvertisementTable } from "~/common/components/AdvertisementTable";

const Location: React.FC = ({}) => {
  const { data: sessionData } = useSession();

  const router = useRouter();
  const { id } = router.query;
  const routerParam = id?.[0] !== undefined ? Number(id[0]) : 0;

  const { data } = api.location.getById.useQuery(routerParam);
  const { data: advertisements, isLoading } =
    api.advertisement.getAllByLocationId.useQuery(routerParam, {
      enabled: !!routerParam,
    });

  if (sessionData?.user === undefined) return <Login />;
  return (
    <Flex justify={"center"}>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <Box sx={{ maxWidth: 340 }}>{data && <LocationForm data={data} />}</Box>
      <Box mx={"right"}>
        {advertisements && (
          <AdvertisementTable advertisements={advertisements ?? []} />
        )}
      </Box>
    </Flex>
  );
};

export default Location;
