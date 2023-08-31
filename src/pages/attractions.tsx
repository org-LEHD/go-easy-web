import { useSession } from "next-auth/react";
import Login from "./login";
import { Button, Container, Flex, NavLink } from "@mantine/core";
import { api } from "~/utils/api";
import { LocationTable } from "~/common/components/LocationTable";
import { AttractionTable } from "~/common/components/AttractionTable";
import { IconArrowRight } from "@tabler/icons";

const Attractions: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: Attractions, isLoading } = api.attraction.getAll.useQuery();

  if (sessionData?.user === undefined) return <Login />;
  if (isLoading) return <div>Im loading</div>;
  return (
    <Container>
      <Flex direction={"column"} gap={"md"}>
        <h1>Seværdighedder</h1>
        <AttractionTable attractions={Attractions as any} />
        <NavLink
          href={`/attraction/new`}
          component="a"
          icon={<IconArrowRight color="blue" />}
          />
      </Flex>
    </Container>
  );
};
export default Attractions;
