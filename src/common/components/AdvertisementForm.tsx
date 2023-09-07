import {
  Button,
  TextInput,
  Select,
  Group,
  LoadingOverlay,
  Textarea,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { api } from "~/utils/api";
import { DateTimePicker } from "@mantine/dates";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { redirect } from "~/utils/redirect";
import { useEffect } from "react";

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
  const isUpdate = routerParam > 0;
  const { refetch } = api.advertisement.delete.useQuery(routerParam, {
    enabled: false,
    refetchOnWindowFocus: false,
    onSuccess: () => void router.back(),
  });
  const { data: sessionData } = useSession();
  const { data: locations } = api.location.getAllById.useQuery(
    sessionData?.user.id ?? 0,
    {
      enabled:
        sessionData?.user.id !== undefined && sessionData?.user.id !== null,
    }
  );
  useEffect(() => {
    const shouldRedirect = async () => {
      if (sessionData && sessionData.user.access !== "Granted") {
        await redirect(router);
      }
    };
    void shouldRedirect();
  }, [router, sessionData, sessionData?.user]);
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
  const onSubmitDelete = () => {
    void refetch();
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

  const onSelectLocation = (input: any) => {
    form.setValues({ locationId: Number(input) });
  };

  return (
    <form onSubmit={form.onSubmit((values) => onSubmitUpdate(values))}>
      <LoadingOverlay visible={isUpdating ?? isCreating} overlayBlur={2} />
      <Select
        withAsterisk
        label={"Vælg lokation"}
        data={
          locations && locations.length > 0
            ? locations?.map((location) => {
                return {
                  value: location.id.toString(),
                  label: location.name,
                };
              })
            : []
        }
        defaultValue={data?.locationId.toString()}
        onChange={onSelectLocation}
      />
      <TextInput
        withAsterisk
        label="Titel"
        placeholder="Peppes pizza"
        mt="sm"
        {...form.getInputProps("title")}
      />
      <Textarea
        withAsterisk
        label="Beskrivelse"
        placeholder="Byens bedste pizza"
        maxLength={191}
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
      <Group position={isUpdate ? "apart" : "right"} mt="xl">
        {isUpdate && (
          <Button variant="outline" color="red" onClick={onSubmitDelete}>
            Slet
          </Button>
        )}
        <Button type="submit" variant="outline">
          {isUpdate ? "Opdatér" : "Opret"}
        </Button>
      </Group>
    </form>
  );
};
export default AdvertisementForm;
