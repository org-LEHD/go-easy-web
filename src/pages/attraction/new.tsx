import { useSession } from "next-auth/react";
import Login from "../login";
import { Box } from "@mantine/core";

import AttractionForm from "~/common/components/AttractionForm";


const Location: React.FC = () => {
  const { data: sessionData } = useSession();

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
