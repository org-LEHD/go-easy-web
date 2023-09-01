/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
    Button,
    TextInput,
    Select,
    NumberInput,
    Group,
    Text,
    Textarea,
  } from "@mantine/core";
  import { useForm, zodResolver } from "@mantine/form";
  import { CategorySchema } from "../../../prisma/generated/zod";
  import { type $Enums, Category } from "@prisma/client";
  import { z } from "zod";
  import { useState } from "react";
  import { mapCategoryEnumToObject } from "~/utils/mapCategoryEnumToObject";
  import { useQuery } from "@tanstack/react-query";
  import { useDebouncedValue } from "@mantine/hooks";
  import { useAutoAnimate } from "@formkit/auto-animate/react";
  import { api } from "~/utils/api";
  import { useSession } from "next-auth/react";
  import { useRouter } from "next/router";
  import { useEffect } from "react";
  
  const attractionValidationSchema = z.object({
    name: z.string(),
    category: CategorySchema,
    thumbnail: z.string(),
    description: z.string(),
    address: z.string(),
    lat: z.number(),
    long: z.number(),
  });
  
  export interface AttractionFormProps {
    data: AttractionObject | null | undefined;
  }
  
  interface AttractionObject {
    id: number;
    category: $Enums.Category;
    name: string;
    address: string;
    lat: number;
    long: number;
    description: string;
    thumbnail: string;
  }
  
  interface AddressObject {
    display_name: string;
    latitude: number;
    longitude: number;
  }
  
  export const fetchAddressCoordinates = async (address: string) => {
    const baseUrl = "https://nominatim.openstreetmap.org";
    const format = "json";
    const query = encodeURIComponent(address);
    const url = `${baseUrl}/search?street=${query}&format=${format}`;
  
    const response = await fetch(url);
    const data = await response.json();
  
    if (data && data.length > 0) {
      return data.map((row: any) => {
        return {
          display_name: row.display_name,
          latitude: row.lat,
          longitude: row.lon,
        };
      });
    } else {
      throw new Error("Kunne ikke finde addressen.");
    }
  };
  
  export const AttractionForm: React.FC<AttractionFormProps> = ({ data }) => {
    const [parent] = useAutoAnimate();
    const [searchParam, setSearchParam] = useState<string | null>(null);
    const [debounced] = useDebouncedValue(searchParam, 500);
    const session = useSession();
    const { data: sessionData } = useSession();
  
    const routerInfo = useRouter();
    useEffect(() => {
      sessionData && sessionData.user.role !== "Administrator"
        ? router.push("/")
        : null;
    }, [sessionData?.user]);
    const { id } = routerInfo.query;
    const routerParam = id?.[0] !== undefined ? Number(id[0]) : 0;
    
    const router = useRouter();
  
    const { mutate: updateMutation } = api.attraction.update.useMutation({onSuccess: () => router.push('/attractions')});
    const { mutate: createMutation } = api.attraction.create.useMutation({onSuccess: () => router.push('/attractions')});
  
  
    const onSubmitUpdate = (values: AttractionObject) => {
      if (!session.data?.user.id) return;
      if (routerParam !== 0) {
        updateMutation({
            ...values,
            id: routerParam,
        });
      } else {
        const payload = {
          userId: session.data?.user.id,
          ...values,
        } as any;
        delete payload.id;
        createMutation(payload);
      }
    };
  
    const form = useForm({
      validate: zodResolver(attractionValidationSchema),
      initialValues: {
        id: routerParam ?? null,
        name: data?.name ?? "",
        address: data?.address ?? "",
        category: data?.category ?? Category.Undefined,
        description: data?.description ?? "",
        thumbnail: data?.thumbnail ?? "",
        lat: data?.lat ?? 0,
        long: data?.long ?? 0,
      },
    });
  
    const { data: coords, error: coordError } = useQuery(
      ["addressCoords", debounced],
      () => fetchAddressCoordinates(debounced!),
      { enabled: debounced !== null, retry: false }
    );
  
    const setAddress = (address: string) => {
      const addressObj: AddressObject = coords.filter((obj: AddressObject) => {
        return obj.display_name === address;
      })[0];
      setSearchParam(null);
      form.setValues({
        address: addressObj.display_name,
        lat: Number(addressObj.latitude),
        long: Number(addressObj.longitude),
      });
    };
  
    return (
      <form
        onSubmit={form.onSubmit((values) => onSubmitUpdate(values))}
        ref={parent}
      >
        <TextInput
          withAsterisk
          label="Navn"
          placeholder="John Doe"
          {...form.getInputProps("name")}
        />
        <TextInput
          withAsterisk
          label="Adresse"
          placeholder="Vejgade 21"
          mt="sm"
          onChange={(event) => setSearchParam(event.currentTarget.value)}
          value={searchParam ?? form.values.address}
          error={
            coordError
              ? "Kunne ikke finde koordinater på den valgte addresse"
              : false
          }
        />
        {form.values.address && (
          <Text
            c="dimmed"
            fz={"xs"}
          >{`Latitude: ${form.values.lat}, Longitude: ${form.values.long}`}</Text>
        )}
  
        {coords && (
          <Select
            withAsterisk
            label="Vælg resultat"
            data={coords.map(
              (coord: {
                display_name: string;
                latitude: number;
                longitude: number;
              }) => {
                return { value: coord.display_name, label: coord.display_name };
              }
            )}
            onChange={setAddress}
          />
        )}
        <Select
          label="Kategori"
          placeholder="Vælg en kategori"
          mt="sm"
          data={mapCategoryEnumToObject()}
          {...form.getInputProps("category")}
        />
        <Textarea
          withAsterisk
          label="Beskrivelse"
          placeholder="Beskrivelse"
          mt="sm"
          {...form.getInputProps("description")}
        />
        <TextInput
          withAsterisk
          label="Thumbnail"
          placeholder="picture.com/cat.jpg"
          mt="sm"
          {...form.getInputProps("thumbnail")}
        />
        <Group position="right" mt="xl">
          <Button type="submit" variant="outline">Submit</Button>
        </Group>
      </form>
    );
  };
  export default AttractionForm;
  