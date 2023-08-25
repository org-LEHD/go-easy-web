import { useSession } from "next-auth/react";
import Login from "./login";
import { Box, Button, Container, Flex, Grid, Table } from "@mantine/core";
import { api } from "~/utils/api";
import { AdvertisementTable } from "~/common/components/AdvertisementTable";

const Advertisements: React.FC = () => {
  const { data: sessionData } = useSession();
  if (sessionData === null) {
    return <Login />;
  }
  const { data: advertisements, isLoading } = api.advertisement.getAllById.useQuery(
    sessionData?.user?.id ?? 0,
    { enabled: sessionData?.user.id !== undefined }
  );

  if (sessionData?.user === undefined) return <Login />;
  if (isLoading) return <div>Im loading</div>;

  return (
    <Container>
      <Flex direction={"column"} gap={"md"}>
        <h1>Annoncer</h1>
        <AdvertisementTable advertisements={advertisements as any} />
        <Button>Ny Annonce</Button>
      </Flex>
    </Container>
  );
};
export default Advertisements;
