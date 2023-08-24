import { useSession } from "next-auth/react";
import Login from "./login";
import { Box, Button, Container, Flex, Grid, NavLink, Table } from "@mantine/core";
import { api } from "~/utils/api";
import { IconArrowRight } from "@tabler/icons";
import { DynamicTable } from "~/common/components/Table";

const Requests: React.FC = () => {
  const { data: sessionData } = useSession();
  if (sessionData === null) {
    return <Login />;
  }
  const { data } = api.user.getAll.useQuery();
  return (
    <Container>
      <Flex direction={"column"} gap={"md"}>
        <h1>Anmodninger</h1>
        <DynamicTable headers={["Navn","Email", "Role", "Access", "Oprettet", " "]} rows={data?.map((row, index) => {
          
        })}/>
        {/* <Button>Ny Annonce</Button> */}
      </Flex>
    </Container>
  );
};
export default Requests;
