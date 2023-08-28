import { useSession } from "next-auth/react";
import Login from "../login";
import { Box } from "@mantine/core";

import LocationForm from "~/common/components/LocationForm";

export type LocationProps = {
  locationId?: number;
};

const Location: React.FC<LocationProps> = () => {
  const { data: sessionData } = useSession();

  if (sessionData?.user === undefined) {
    return <Login />;
  }
  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <LocationForm data={undefined} />
    </Box>
  );
};

export default Location;
