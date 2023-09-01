import { useSession } from "next-auth/react";
import Login from "../login";
import { LocationTable } from "~/common/components/LocationTable";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { Container, LoadingOverlay } from "@mantine/core";
import { pluralizeWithUppercase } from "~/utils/pluralizeWithUppercase";
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
