import { useSession } from "next-auth/react";
import Login from "./login";
import { Button, Container, Flex, NavLink } from "@mantine/core";
import { api } from "~/utils/api";
import { AdvertisementTable } from "~/common/components/AdvertisementTable";
import { IconArrowRight } from "@tabler/icons";

const Advertisements: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: advertisements, isLoading } =
    api.advertisement.getAllByUserId.useQuery(sessionData?.user?.id ?? 0, {
      enabled: sessionData?.user.id !== undefined,
    });

  if (sessionData?.user === undefined) return <Login />;
  if (isLoading) return <div>Im loading</div>;
  return (
    <Container>
      <Flex direction={"column"} gap={"md"}>
        <h1>Annoncer</h1>
        <AdvertisementTable advertisements={advertisements as any} />
        <NavLink
          href={`/advertisement/new`}
          component="a"
          icon={<IconArrowRight color="blue" />}
          />
      </Flex>
    </Container>
  );
};
export default Advertisements;
