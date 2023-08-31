import {
  Button,
  TextInput,
  NumberInput,
  Group,
  LoadingOverlay,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { api } from "~/utils/api";
import { DateTimePicker } from "@mantine/dates";
import { useRouter } from "next/router";

const advertisementValidationSchema = z.object({
  locationId: z.number().int(),
  title: z.string(),
  description: z.string(),
  media: z.string(),
  start: z.date(),
  end: z.date(),
});

export interface AdvertisementFormProps {
  data: AdvertisementObject | null | undefined;
}

interface AdvertisementObject {
  locationId: number;
  title: string;
  description?: string;
  media?: string;
  start?: Date;
  end?: Date;
}

export const AdvertisementForm: React.FC<AdvertisementFormProps> = ({
  data,
}) => {
  const router = useRouter();
  const { id } = router.query;
  const routerParam = id?.[0] !== undefined ? Number(id[0]) : 0;

  const { mutate: updateMutation, isLoading: isUpdating } =
    api.advertisement.update.useMutation({
      onSuccess: () => router.push("/advertisements"),
    });
  const { mutate: createMutation, isLoading: isCreating } =
    api.advertisement.create.useMutation({
      onSuccess: () => router.push("/advertisements"),
    });

  const onSubmitUpdate = (values: AdvertisementObject) => {
    if (routerParam !== 0) {
      updateMutation({
        ...values,
        id: routerParam,
      } as any);
    } else {
      const payload = {
        ...values,
      } as any;
      delete payload.id;
      createMutation(payload);
    }
  };

  const form = useForm({
    validate: zodResolver(advertisementValidationSchema),
    initialValues: {
      locationId: data?.locationId ?? 0,
      title: data?.title ?? "",
      description: data?.description ?? "",
      media: data?.media ?? "",
      start: data?.start ?? new Date(),
      end: data?.end ?? new Date(),
      createdAt: z.date() ?? null,
      updatedAt: z.date() ?? null,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => onSubmitUpdate(values))}>
      <LoadingOverlay visible={isUpdating ?? isCreating} overlayBlur={2} />
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
        label="Media"
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
        <Button type="submit" variant="outline">
          Submit
        </Button>
      </Group>
    </form>
  );
};
export default AdvertisementForm;
