import { useSession } from "next-auth/react";
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
import { DateTimePicker } from "@mantine/dates";

const advertisementValidationSchema = z.object({
  id: z.number().int(),
  locationId: z.string(),
  title: z.string(),
  description: z.string(),
  media: z.string(),
  start: z.string(),
  end: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface AdvertisementFormProps {
  data: any;
}

export const AdvertisementForm: React.FC<AdvertisementFormProps> = ({
  data,
}) => {
  const form = useForm({
    validate: zodResolver(advertisementValidationSchema),
    initialValues: {
      locationId: data?.locationId ?? 0,
      title: data?.title ?? "",
      description: data?.description ?? "",
      media: data?.media ?? "",
      start: data?.start ?? null,
      end: data?.end ?? null,
      createdAt: z.date() ?? null,
      updatedAt: z.date() ?? null,
    },
  });

  useEffect(() => {
    if (!data) return;
    form.setValues({ ...data });
  }, [data]);
  
  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <NumberInput
        withAsterisk
        label="Lokation id"
        placeholder="123"
        {...form.getInputProps("locationId")}
      />
      <TextInput
        withAsterisk
        label="Titel"
        placeholder="Peppes pizza"
        mt="sm"
        {...form.getInputProps("title")}
      />
      <TextInput
        withAsterisk
        label="Beskrivelse"
        placeholder="Byens bedste pizza"
        mt="sm"
        {...form.getInputProps("description")}
      />
      <TextInput
        withAsterisk
        label="Media "
        placeholder="https://i.imgur.com/uvFEcJN.jpeg"
        mt="sm"
        {...form.getInputProps("media")}
      />
      <DateTimePicker
        label="Start"
        placeholder="Vælg start dato og tidspunkt"
        maw={400}
        mx="auto"
        {...form.getInputProps("start")}
      />
      <DateTimePicker
        label="Slut"
        placeholder="Vælg slut dato og tidspunkt"
        maw={400}
        mx="auto"
        {...form.getInputProps("end")}
      />
      <Group position="right" mt="xl">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};
export default AdvertisementForm;
