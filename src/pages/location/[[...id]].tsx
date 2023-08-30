import { useSession } from "next-auth/react";
import Login from "../login";
import {
  Box,
  Button,
  TextInput,
  Select,
  NumberInput,
  Group,
  Stack,
  Flex,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { CategorySchema } from "../../../prisma/generated/zod";
import { Category } from "@prisma/client";
import { z } from "zod";
import { useEffect } from "react";
import { api } from "~/utils/api";
import LocationForm from "~/common/components/LocationForm";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { AdvertisementTable } from "~/common/components/AdvertisementTable";

const Location: React.FC = ({}) => {
  const { data: sessionData } = useSession();

  const router = useRouter();
  const { id } = router.query;
  const routerParam = id?.[0] !== undefined ? Number(id[0]) : 0;

  const { data } = api.location.getById.useQuery(routerParam);
  const { data: advertisements, isLoading } =
    api.advertisement.getAllByLocationId.useQuery(routerParam);

  if (!data) return <></>;

  if (sessionData?.user === undefined) {
    return <Login />;
  }
  return (
    <Flex justify={"center"}>
      <Box sx={{ maxWidth: 340 }}>
        <LocationForm data={data} />
      </Box>
      <Box mx={"right"}>
        {advertisements && (
          <AdvertisementTable advertisements={advertisements as any} />
        )}
      </Box>
    </Flex>
  );
};

export default Location;
