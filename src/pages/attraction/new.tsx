import { useSession } from "next-auth/react";
import Login from "../login";
import { Box } from "@mantine/core";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AttractionForm from "~/common/components/AttractionForm";


const Location: React.FC = () => {
  const { data: sessionData } = useSession();

  const router = useRouter();
  useEffect(() => {
    sessionData && sessionData.user.role !== "Administrator"
      ? router.push("/")
      : null;
  }, [router, sessionData, sessionData?.user]);

  if (sessionData?.user === undefined) {
    return <Login />;
  }
  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <AttractionForm data={undefined} />
    </Box>
  );
};

export default Location;
