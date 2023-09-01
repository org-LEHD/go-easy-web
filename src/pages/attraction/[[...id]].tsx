import { useSession } from "next-auth/react";
import Login from "../login";
import { Box } from "@mantine/core";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import AttractionForm from "~/common/components/AttractionForm";
import { useEffect } from "react";

const Attraction: React.FC = ({}) => {
  const { data: sessionData } = useSession();

  const router = useRouter();
  useEffect(() => {
    sessionData && sessionData.user.role !== "Administrator"
      ? router.push("/")
      : null;
  }, [sessionData?.user]);

  const { id } = router.query;
  const routerParam = id?.[0] !== undefined ? Number(id[0]) : 0;

  const { data } = api.attraction.getById.useQuery(routerParam);

  if (!data) return <></>;

  if (sessionData?.user === undefined) return <Login />;
  return (
    <Box sx={{ maxWidth: 340 }} mx={"auto"}>
      <AttractionForm data={data} />
    </Box>
  );
};

export default Attraction;
