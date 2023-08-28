import { useSession } from "next-auth/react";
import Login from "./login";
import { Container, Flex } from "@mantine/core";
import { api } from "~/utils/api";
import { Access } from "@prisma/client";
import { UserTable } from "~/common/components/UserTable";

const Requests: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: users, isLoading } = api.user.getAll.useQuery();

  if (sessionData?.user === undefined) return <Login />;
  if (isLoading) return <div>Im loading</div>;
  return (
    <Container>
      <Flex direction={"column"} gap={"md"}>
        <h1>Anmodninger</h1>
        <UserTable
          users={
            users?.filter(
              (user) => user.access === Access.Pending.toString()
            ) ?? []
          }
        />
        <h1>Benægtede</h1>
        <UserTable
          users={
            users?.filter((user) => user.access === Access.Denied.toString()) ??
            []
          }
        />
      </Flex>
    </Container>
  );
};
export default Requests;
