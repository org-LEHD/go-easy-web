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

const Locations: React.FC = () => {
  const { data: sessionData } = useSession();
  if (sessionData?.user === undefined) {
    return <Login />;
  }
  const { data } = api.location.getAllById.useQuery(sessionData.user?.id);
  console.log("🚀 ~ file: locations.tsx:13 ~ data:", data);

  return (
    <Container>
      <Flex direction={"column"} gap={"md"}>
        <h1>Lokationer</h1>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Forretning</th>
              <th>Website</th>
              <th>Oprettet</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((_, key) => (
              <tr key={key}>
                <td>{_.id}</td>
                <td>{_.name}</td>
                <td>{_.website}</td>
                <td>{_.createdAt.getDate()}</td>
                <td>
                  <NavLink
                    href={`/location/${_.id}`}
                    component="a"
                    icon={<IconArrowRight color="blue" />}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button>Ny Lokation</Button>
      </Flex>
    </Container>
  );
};

export default Locations;
