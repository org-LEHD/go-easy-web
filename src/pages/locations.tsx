import { useSession } from "next-auth/react";
import Login from "./login";
import { Container, Flex, LoadingOverlay, Button } from "@mantine/core";
import { api } from "~/utils/api";
import { LocationTable } from "~/common/components/LocationTable";

const Locations: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: locations, isLoading } = api.location.getAllById.useQuery(
    sessionData?.user?.id ?? 0,
    { enabled: sessionData?.user.id !== undefined }
  );

  if (sessionData?.user === undefined) return <Login />;
  return (
    <Container>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <Flex direction={"column"} gap={"md"}>
        <h1>Lokationer</h1>
        <LocationTable locations={locations as any} />
        <Flex justify={"flex-end"}>
          <Button
            href={`/location/new`}
            component="a"
            variant="outline"
            w={200}
          >
            Ny lokation
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Locations;
