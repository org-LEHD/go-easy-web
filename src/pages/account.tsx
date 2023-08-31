import { useSession } from "next-auth/react";
import Login from "./login";
import { Box, LoadingOverlay } from "@mantine/core";
import { api } from "~/utils/api";
import AccountForm from "~/common/components/AccountForm";

const Account: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data, isLoading } = api.user.getById.useQuery(
    sessionData?.user?.id ?? 0,
    {
      enabled: sessionData?.user.id !== undefined,
    }
  );

  if (sessionData?.user === undefined) return <Login />;
  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <AccountForm data={data} />
    </Box>
  );
};
export default Account;
