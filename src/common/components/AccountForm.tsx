import { Button, TextInput, Group } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { z } from "zod";
import { api } from "~/utils/api";

export const userValidadationSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  email: z.string(),
});

interface UserObject {
  id: number;
  name: string;
  email: string;
}

export interface AccountFormProps {
  data: any;
}

export const AccountForm: React.FC<AccountFormProps> = ({ data }) => {
  const session = useSession();
  const router = useRouter();
  const { mutate: updateMutation } = api.user.update.useMutation({onSuccess: () => router.reload()});

  const form = useForm({
    validate: zodResolver(userValidadationSchema),
    initialValues: {
      id: data?.id,
      name: data?.name,
      email: data?.email,
    },
  });

  const onSubmitUpdate = (values: UserObject) => {
    if (!session.data?.user.id) return;
    updateMutation({
      ...values,
      id: session.data.user.id,
    });
  };

  return (
    <form onSubmit={form.onSubmit((values) => onSubmitUpdate(values))}>
      <TextInput
        withAsterisk
        label="Navn"
        placeholder="john doe"
        {...form.getInputProps("name")}
      />
      <TextInput
        withAsterisk
        label="Email"
        placeholder="email@mail.com"
        mt="sm"
        {...form.getInputProps("email")}
      />
      <Group position="right" mt="xl">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};
export default AccountForm;
