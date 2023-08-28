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
import AdvertisementForm from "~/common/components/AdvertisementForm";
import { useRouter } from "next/router";

const Advertisement: React.FC = ({}) => {
  const { data: sessionData } = useSession();

  const routerInfo = useRouter();
  const {id} = routerInfo.query;  
  const routerParam = id && id[0] !== undefined ? Number(id[0]) : 0;

  const { data } = api.advertisement.getById.useQuery(routerParam);

  if (!data) return <></>;

  if (sessionData?.user === undefined) {
    return <Login />;
  }
  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <AdvertisementForm data={data} />
    </Box>
  );
};

export default Advertisement;
