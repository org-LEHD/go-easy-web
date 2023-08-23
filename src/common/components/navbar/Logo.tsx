import { Button, Text } from "@mantine/core";
import { IconMapPin } from "@tabler/icons";
import Link from "next/link";

export const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Button variant="subtle" leftIcon={<IconMapPin size={26} />}>
        <Text>GoEasy</Text>
      </Button>
    </Link>
  );
};
