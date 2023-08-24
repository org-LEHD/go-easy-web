import { useSession } from "next-auth/react";
import Login from "./login";
import { Box, Button, Container, Flex, Grid, Table } from "@mantine/core";

const Advertisements: React.FC = () => {
  const { data: sessionData } = useSession();
  if (sessionData === null) {
    return <Login />;
  }

  return (
    <Container>
      <Flex>
        <h1>Annoncer</h1>
        <Table>
          <thead>
            <tr>
              <th>AnnonceID</th>
              <th>Navn</th>
              <th>Start</th>
              <th>Slut</th>
              <th>Forretning</th>
              <th>Oprettet</th>
              <th> </th>
            </tr>
          </thead>
        </Table>
        <Button>Ny Annonce</Button>
      </Flex>
    </Container>
  );
};
export default Advertisements;
