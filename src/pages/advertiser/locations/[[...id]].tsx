import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { Container, LoadingOverlay } from "@mantine/core";
import { pluralizeWithUppercase } from "~/utils/pluralizeWithUppercase";
import Login from "~/pages/login";
import { AdvertisementTable } from "~/common/components/AdvertisementTable";
import { useEffect } from "react";

const Account: React.FC = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  useEffect(() => {
    sessionData && sessionData.user.role !== "Administrator"
      ? router.push("/")
      : null;
  }, [sessionData?.user]);
  const { id } = router.query;
  const routerParam = id?.[0] !== undefined ? Number(id[0]) : 0;

  const { data: locations, isLoading } =
    api.advertisement.getAllByLocationId.useQuery(routerParam, {
      enabled: routerParam !== undefined,
    });

  const { data: location, isLoading: isLoadingLocation } =
    api.location.getById.useQuery(routerParam, {
      enabled: routerParam !== undefined,
    });

  if (sessionData === null) return <Login />;
  return (
    <Container>
      <h1>{`${pluralizeWithUppercase(location?.name ?? "")} annoncer`}</h1>
      <LoadingOverlay visible={isLoading ?? isLoadingLocation} overlayBlur={2} />
      <AdvertisementTable advertisements={locations ?? []} />
    </Container>
  );
};
export default Account;
