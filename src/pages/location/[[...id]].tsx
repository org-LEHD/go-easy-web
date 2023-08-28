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
import { mapCategoryEnumToObjects } from "~/utils/mapCategoryEnumToObject";
import LocationForm from "~/common/components/LocationForm";

export type LocationProps = {
  locationId?: number;
};

const locationValidationSchema = z.object({
  userId: z.number().int(),
  name: z.string(),
  address: z.string(),
  phone: z.number().int(),
  category: CategorySchema,
  summary: z.string(),
  description: z.string(),
  thumbnail: z.string(),
  website: z.string(),
  lat: z.number(),
  long: z.number(),
});

const Location: React.FC<LocationProps> = ({ locationId }) => {
  const { data: sessionData } = useSession();

  const { data } = api.location.getById.useQuery(locationId ?? 1);

  useEffect(() => {
    if (!data) return;
    form.setValues({ ...data });
  }, [data]);

  const form = useForm({
    validate: zodResolver(locationValidationSchema),
    initialValues: {
      name: data?.name ?? "",
      address: data?.address ?? "",
      category: data?.category ?? Category.Undefined,
      phone: data?.phone ?? null,
      website: data?.website ?? "",
      summary: data?.summary ?? "",
      description: data?.description ?? "",
      thumbnail: data?.thumbnail ?? "",
      lat: data?.lat ?? null,
      long: data?.long ?? null,
    },
  });

  if (!data) return <></>;

  if (sessionData?.user === undefined) {
    return <Login />;
  }
  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
     <LocationForm data={data}/>
    </Box>
  );
};

export default Location;
