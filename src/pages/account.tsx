import { useSession } from "next-auth/react";
import Login from "./login";
import {
  ActionIcon,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Table,
  TextInput,
  Select,
  NumberInput,
  Group,
} from "@mantine/core";
// import { api } from "../../common/utils/api";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons";
import { useForm, zodResolver } from "@mantine/form";
import { Access, Category } from "@prisma/client";
import { z } from "zod";
// import { mapCategoryEnumToObjects } from "../../common/utils/mapCategoryEnumToObject";
import { useEffect } from "react";
import { api } from "~/utils/api";
import { mapCategoryEnumToObjects } from "~/utils/mapCategoryEnumToObject";
import { AccountUpdateInputSchema, UserUpdateInputSchema } from "prisma/generated/zod";
import AccountForm from "~/common/components/AccountForm";

const userValidadationSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  email: z.string(),
});

const Account: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data, isLoading} = api.user.getById.useQuery(sessionData?.user?.id ?? 0, {
    enabled: sessionData?.user.id !== undefined,
  });

  if (!data) return <></>;

  if (sessionData?.user === undefined) {
    return <Login />;
  }
  if (isLoading) return <div>Im loading</div>;
  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <AccountForm data={data}/>
    </Box>
  );
};
export default Account;