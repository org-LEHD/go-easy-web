import { useSession } from "next-auth/react";
import Login from "./login";
import { Container, Flex, LoadingOverlay } from "@mantine/core";
import { api } from "~/utils/api";
import { Access } from "@prisma/client";
import { UserTable } from "~/common/components/UserTable";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Requests: React.FC = () => {
  const { data: sessionData } = useSession();

  const router = useRouter();
  useEffect(() => {
    sessionData && sessionData.user.role !== "Administrator"
      ? router.push("/")
      : null;
  }, [router, sessionData, sessionData?.user]);

  const { data: users, isLoading } = api.user.getAll.useQuery();

  if (sessionData?.user === undefined) return <Login />;
  return (
    <Container>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
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
