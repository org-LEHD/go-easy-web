import { useSession } from "next-auth/react";
import Login from "./login";
import { Button, Container, Flex, LoadingOverlay } from "@mantine/core";
import { api } from "~/utils/api";
import { LocationTable } from "~/common/components/LocationTable";

const Attractions: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: locations, isLoading } = api.pointOfInterest.getAll.useQuery();

  if (sessionData?.user === undefined) return <Login />;
  return (
    <Container>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <Flex direction={"column"} gap={"md"}>
        <h1>Seværdighedder</h1>
        <LocationTable locations={locations as any} />
        <Button>Ny Lokation</Button>
      </Flex>
    </Container>
  );
};
export default Attractions;
