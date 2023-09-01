import { useSession } from "next-auth/react";
import Login from "../login";
import { Box } from "@mantine/core";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import AttractionForm from "~/common/components/AttractionForm";
import { useEffect } from "react";
import { redirect } from "~/utils/redirect";

const Attraction: React.FC = ({}) => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const routerParam = id?.[0] !== undefined ? Number(id[0]) : 0;

  useEffect(() => {
    const shouldRedirect = async () => {
      if (sessionData && sessionData.user.role !== "Administrator") {
        await redirect(router);
      }
    };
    void shouldRedirect();
  }, [router, sessionData, sessionData?.user]);


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
