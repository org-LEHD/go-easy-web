import { Button, Text } from "@mantine/core";
import { IconLogout } from "@tabler/icons";
import { signOut } from "next-auth/react";

export const LogoutButton: React.FC = () => {
  return (
    <Button
      h={"24px"}
      w={"100%"}
      styles={() => ({
        root: {
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      })}
      leftIcon={<IconLogout />}
      variant="subtle"
      color="red"
      onClick={() => void signOut()}
    >
      <Text>Logout</Text>
    </Button>
  );
};
