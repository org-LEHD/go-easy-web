import { useSession } from "next-auth/react";
import Login from "./login";
import {
  ActionIcon,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Table,
  NavLink,
} from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons";
import { api } from "~/utils/api";
import { LocationTable } from "~/common/components/LocationTable";

const Locations: React.FC = () => {
  const { data: sessionData } = useSession();
  if (sessionData?.user === undefined) {
    return <Login />;
  }
  const { data: locations } = api.location.getAllById.useQuery(sessionData.user?.id);

  return (
    <Container>
      <Flex direction={"column"} gap={"md"}>
        <h1>Lokationer</h1>
        <LocationTable locations={locations as any}/>
        <Button>Ny Lokation</Button>
      </Flex>
    </Container>
  );
};

export default Locations;
