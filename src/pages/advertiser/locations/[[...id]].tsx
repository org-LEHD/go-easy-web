import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { Container, LoadingOverlay } from "@mantine/core";
import { pluralizeWithUppercase } from "~/utils/pluralizeWithUppercase";
import Login from "~/pages/login";
import { AdvertisementTable } from "~/common/components/AdvertisementTable";
import { useEffect } from "react";
import { redirect } from "~/utils/redirect";

const Account: React.FC = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const routerParam = id?.[0] !== undefined ? Number(id[0]) : 0;
  
  useEffect(() => {
    const shouldRedirect = async () => {
      if (sessionData && sessionData.user.role !== "Administrator") {
        await redirect(router);
      }
    };
    void shouldRedirect();
  }, [router, sessionData, sessionData?.user]);
  
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
