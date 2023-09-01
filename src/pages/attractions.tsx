import { useSession } from "next-auth/react";
import Login from "./login";
import { Button, Container, Flex, LoadingOverlay } from "@mantine/core";
import { api } from "~/utils/api";
import { AttractionTable } from "~/common/components/AttractionTable";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Attractions: React.FC = () => {
  const { data: sessionData } = useSession();

  const router = useRouter();
  useEffect(() => {
    sessionData && sessionData.user.role !== "Administrator"
      ? router.push("/")
      : null;
  }, [sessionData?.user]);

  const { data: Attractions, isLoading } = api.attraction.getAll.useQuery();

  if (sessionData?.user === undefined) return <Login />;
  return (
    <Container>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <Flex direction={"column"} gap={"md"}>
        <h1>Seværdighedder</h1>
        <AttractionTable attractions={Attractions ?? []} />
        <Flex justify={"flex-end"}>
          <Button
            href={`/attraction/new`}
            component="a"
            variant="outline"
            w={200}
          >
            Ny seværdighed
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};
export default Attractions;
