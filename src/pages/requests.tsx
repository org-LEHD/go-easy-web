import { useSession } from "next-auth/react";
import Login from "./login";
import { Box, Button, Container, Flex, Grid, NavLink, Table } from "@mantine/core";
import { api } from "~/utils/api";
import { IconArrowRight } from "@tabler/icons";

const Requests: React.FC = () => {
  const { data: sessionData } = useSession();
  if (sessionData === null) {
    return <Login />;
  }
  const { data } = api.user.getAll.useQuery();
  return (
    <Container>
      <Flex>
        <h1>Anmodninger</h1>
        <Table>
          <thead>
            <tr>
              <th>Navn</th>
              <th>Email</th>
              <th>Email Verified</th>
              <th>Role</th>
              <th>Access</th>
              <th>Oprettet</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((_, key) => (
              <tr key={key}>
                <td>{_.name}</td>
                <td>{_.email}</td>
                <td>{_.emailVerified?.getDate()}</td>
                <td>{_.role}</td>
                <td>{_.access}</td>
                <td>{_.createdAt.getDate()}</td>
                <td>
                  <NavLink
                    // href={`/location/${_.id}`}
                    // component="a"
                    icon={<IconArrowRight color="blue" />}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* <Button>Ny Annonce</Button> */}
      </Flex>
    </Container>
  );
};
export default Requests;
