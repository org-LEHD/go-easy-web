import { useSession } from "next-auth/react";
import Login from "../login";
import { Box } from "@mantine/core";

import AdvertisementForm from "~/common/components/AdvertisementForm";


const Advertisement: React.FC = () => {
  const { data: sessionData } = useSession();

  if (sessionData?.user === undefined) {
    return <Login />;
  }
  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <AdvertisementForm data={undefined} />
    </Box>
  );
};

export default Advertisement;
