import { useSession } from "next-auth/react";
import Login from "./login";
import { Container, Flex, LoadingOverlay } from "@mantine/core";
import { api } from "~/utils/api";
import { Access } from "@prisma/client";
import { UserTable } from "~/common/components/UserTable";

const Advertisers: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: users, isLoading } = api.user.getAll.useQuery();

  if (sessionData?.user === undefined) return <Login />;

  return (
    <Container>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <Flex direction={"column"} gap={"md"}>
        <h1>Annoncører</h1>
        <UserTable
          users={
            users?.filter(
              (user) => user.access === Access.Granted.toString()
            ) ?? []
          }
        />
        <h1>Deaktiverede annoncøre</h1>
        <UserTable
          users={
            users?.filter(
              (user) => user.access === Access.Disabled.toString()
            ) ?? []
          }
        />
      </Flex>
    </Container>
  );
};
export default Advertisers;
