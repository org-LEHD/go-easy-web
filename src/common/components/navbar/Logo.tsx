import { Button, Text, useMantineTheme } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

export const Logo: React.FC = () => {
  const theme = useMantineTheme();
  return (
    <Link href="/">
      <Button
        variant="subtle"
        styles={() => ({
          label: { overflow: "visible" },
          root: { width: 114 },
        })}
        leftIcon={
          <Image
            src={
              theme.colorScheme === "dark"
                ? "/favicon_light.svg"
                : "/favicon_dark.svg"
            }
            alt={"Go Easy"}
            width={26}
            height={26}
          />
        }
      >
        <Text>GoEasy</Text>
      </Button>
    </Link>
  );
};
