import { useSession } from "next-auth/react";
import Login from "./login";
import { Box, LoadingOverlay, Alert } from "@mantine/core";
import { api } from "~/utils/api";
import AccountForm from "~/common/components/AccountForm";
import { Access, Role } from "@prisma/client";
import { IconAlertCircle } from "@tabler/icons";

const Account: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data, isLoading } = api.user.getById.useQuery(
    sessionData?.user?.id ?? 0,
    {
      enabled: sessionData?.user.id !== undefined,
    }
  );

  const getAlert = (userAccessLevel: Access) => {
    switch (userAccessLevel) {
      case Access.Granted:
        return (
          <Alert
            title="Tillykke!"
            color="teal"
            icon={<IconAlertCircle size="1rem" />}
          >
            Du er blevet givet adgang til Go Easy
          </Alert>
        );
      case Access.Disabled:
        return (
          <Alert title="Øv!" color="red" icon={<IconAlertCircle size="1rem" />}>
            Din konto er blevet lukket, tag kontakt til administratorerne.
          </Alert>
        );
      case Access.Denied:
        return (
          <Alert title="Øv!" color="red" icon={<IconAlertCircle size="1rem" />}>
            Du er blevet benægtet adgang til Go Easy!
          </Alert>
        );

      default:
        return (
          <Alert
            title="Afventer svar!"
            color="gray"
            icon={<IconAlertCircle size="1rem" />}
          >
            Din forespørgsel afventer svar fra Go Easys administratorer
          </Alert>
        );
    }
  };

  if (sessionData?.user === undefined) return <Login />;
  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      {data && (
        <>
          {sessionData.user.role !== Role.Administrator &&
            getAlert(sessionData.user.access)}
          <AccountForm data={data} />
        </>
      )}
    </Box>
  );
};
export default Account;
