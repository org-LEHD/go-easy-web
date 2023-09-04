import {
  createStyles,
  UnstyledButton,
  Text,
  Center,
  useMantineColorScheme,
  Group,
} from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { IconSun, IconMoon } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  control: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 1000,
    paddingLeft: theme.spacing.sm,
    width: "100%",
    height: "100%",
  },

  iconWrapper: {
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.yellow[4]
        : theme.colors.dark[4],
    color: theme.colorScheme === "dark" ? theme.black : theme.colors.blue[2],
  },

  value: {
    lineHeight: 1,
  },
}));

export function ColorSchemeToggle() {
  const { classes } = useStyles();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const Icon = colorScheme === "dark" ? IconSun : IconMoon;

  return (
    <Group position="center" pl={32} pr={32}>
      <UnstyledButton
        aria-label="Toggle theme"
        className={classes.control}
        onClick={() => toggleColorScheme()}
      >
        <Text size="sm" className={classes.value}>
          {upperFirst(colorScheme === "light" ? "dark" : "light")} theme
        </Text>

        <Center className={classes.iconWrapper}>
          <Icon size="1.05rem" stroke={1.5} />
        </Center>
      </UnstyledButton>
    </Group>
  );
}
