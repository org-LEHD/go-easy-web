import { useSession } from "next-auth/react";
import Login from "../login";
import {
  Box,
  Button,
  TextInput,
  Select,
  NumberInput,
  Group,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { CategorySchema } from "../../../prisma/generated/zod";
import { Category } from "@prisma/client";
import { z } from "zod";
import { useEffect } from "react";
import { api } from "~/utils/api";
import LocationForm from "~/common/components/LocationForm";
import { useRouter } from "next/router";

export type LocationProps = {
  locationId?: number;
};

const Location: React.FC<LocationProps> = () => {
  const { data: sessionData } = useSession();

  const routerInfo = useRouter();
  const { id } = routerInfo.query;
  const routerParam = id?.[0] !== undefined ? Number(id[0]) : 0;

  const { data } = api.location.getById.useQuery(routerParam ?? 0);

  if (!data) return <></>;

  if (sessionData?.user === undefined) {
    return <Login />;
  }
  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <LocationForm data={data} />
    </Box>
  );
};

export default Location;
