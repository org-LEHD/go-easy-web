import { useSession } from "next-auth/react";
import Login from "./login";
import { LoadingOverlay, Container, Flex, Button } from "@mantine/core";
import { api } from "~/utils/api";
import { AdvertisementTable } from "~/common/components/AdvertisementTable";

const Advertisements: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: advertisements, isLoading } =
    api.advertisement.getAllByUserId.useQuery(sessionData?.user?.id ?? 0, {
      enabled: sessionData?.user.id !== undefined,
    });

  if (sessionData?.user === undefined) return <Login />;

  return (
    <Container>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <Flex direction={"column"} gap={"md"}>
        <h1>Annoncer</h1>
        <AdvertisementTable advertisements={advertisements as any} />
        <Flex justify={"flex-end"}>
          <Button
            href={`/advertisement/new`}
            component="a"
            variant="outline"
            w={200}
          >
            Ny annonce
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};
export default Advertisements;
