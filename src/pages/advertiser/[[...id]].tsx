import { useSession } from "next-auth/react";
import Login from "../login";
import { LocationTable } from "~/common/components/LocationTable";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { Container, LoadingOverlay } from "@mantine/core";
import { pluralizeWithUppercase } from "~/utils/pluralizeWithUppercase";
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
  
  const { data: locations, isLoading } = api.location.getAllById.useQuery(
    routerParam,
    { enabled: routerParam !== undefined }
  );

  const { data: user, isLoading: isLoadingUser } = api.user.getById.useQuery(
    routerParam,
    { enabled: routerParam !== undefined }
  );

  if (sessionData === null) return <Login />;
  return (
    <Container>
      <LoadingOverlay visible={isLoading ?? isLoadingUser} overlayBlur={2} />
      <h1>{`${pluralizeWithUppercase(user?.name ?? "")} Lokationer`}</h1>
      <LocationTable locations={locations ?? []} />
    </Container>
  );
};
export default Account;
