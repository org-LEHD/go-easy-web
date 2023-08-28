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
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label="Navn"
          placeholder="example@mail.com"
          {...form.getInputProps("name")}
        />
        <TextInput
          withAsterisk
          label="Adresse"
          placeholder="John Doe"
          mt="sm"
          {...form.getInputProps("address")}
        />
        <Select
          label="Kategori"
          placeholder="Vælg en kategori"
          mt="sm"
          data={mapCategoryEnumToObjects()}
          {...form.getInputProps("age")}
        />
        <NumberInput
          withAsterisk
          label="Telefon nummer"
          placeholder="12345678"
          mt="sm"
          {...form.getInputProps("phone")}
        />
        <TextInput
          withAsterisk
          label="Hjemmeside"
          placeholder="https://google.com/"
          mt="sm"
          {...form.getInputProps("website")}
        />
        <TextInput
          withAsterisk
          label="Resume"
          placeholder="Resume"
          mt="sm"
          {...form.getInputProps("summary")}
        />
        <TextInput
          withAsterisk
          label="Beskrivelse"
          placeholder="Beskrivelse"
          mt="sm"
          {...form.getInputProps("description")}
        />
        <NumberInput
          withAsterisk
          label="Latitude"
          placeholder="Latitude"
          mt="sm"
          {...form.getInputProps("lat")}
        />
        <NumberInput
          withAsterisk
          label="Longitude"
          placeholder="Longitude"
          mt="sm"
          {...form.getInputProps("lon")}
        />
        <Group position="right" mt="xl">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};

export default Location;
