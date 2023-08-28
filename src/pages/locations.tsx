import { useSession } from "next-auth/react";
import Login from "./login";
import { Container, Flex, NavLink } from "@mantine/core";
import { api } from "~/utils/api";
import { LocationTable } from "~/common/components/LocationTable";
import { IconArrowRight } from "@tabler/icons";
const Locations: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: locations, isLoading } = api.location.getAllById.useQuery(
    sessionData?.user?.id ?? 0,
    { enabled: sessionData?.user.id !== undefined }
  );

  if (sessionData?.user === undefined) return <Login />;
  if (isLoading) return <div>Im loading</div>;
  return (
    <Container>
      <Flex direction={"column"} gap={"md"}>
        <h1>Lokationer</h1>
        <LocationTable locations={locations as any} />
        <NavLink
          href={`/location/new`}
          component="a"
          icon={<IconArrowRight color="blue" />}
        />
      </Flex>
    </Container>
  );
};

export default Locations;
