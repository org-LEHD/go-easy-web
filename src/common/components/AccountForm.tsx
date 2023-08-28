import { Button, TextInput, Group } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

export const userValidadationSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  email: z.string(),
});

export interface AccountFormProps {
  data: any;
}

export const AccountForm: React.FC<AccountFormProps> = ({ data }) => {
  const form = useForm({
    validate: zodResolver(userValidadationSchema),
    initialValues: {
      id: data?.id,
      name: data?.name,
      email: data?.email,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
