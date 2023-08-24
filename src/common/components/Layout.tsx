import { type ReactElement, useMemo } from "react";
import {
  AppShell,
  Header,
  Flex,
  Container,
  Burger,
  Drawer,
  Divider,
  Space,
  Stack,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import type { NavItemProps } from "./navbar/NavItem";
import { NavItem } from "./navbar/NavItem";
import { PersonaItem } from "./navbar/PersonaItem";
import { Logo } from "./navbar/Logo";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";
import { ColorSchemeToggle } from "./navbar/ColorSchemeToggle";
import { LogoutButton } from "./navbar/LogoutButton";
import { Role } from "@prisma/client";

type Props = {
  children: ReactElement;
};

const Layout: React.FC<Props> = ({ children }) => {
  const matches = useMediaQuery("(min-width: 576px)");
  const { data: sessionData } = useSession();

  const [opened, { toggle, close }] = useDisclosure(false);
  const label = opened ? "Close navigation" : "Open navigation";

  const navItems: NavItemProps[] = useMemo(
    () =>
      sessionData?.user?.role == Role.Administrator
        ? [
          { text: "Anmodninger", href: "/requests" },
            { text: "Annoncører", href: "/advertisers" },
            { text: "Seværdigheder", href: "/attractions" },
          ]
        : [
            { text: "Konto", href: "/account" },
            { text: "Lokationer", href: "/locations" },
            { text: "Annoncer", href: "/advertisements" },
          ],
    [sessionData?.user?.role]
  );

  return (
    <>
      <main>
        <AppShell
          padding={"md"}
          header={
            <Header height={60} p="xs">
              <Flex justify={"space-between"}>
                <Logo />
                {matches ? (
                  <>
                    <Container m="auto" display={"flex"}>
                      {navItems.map((item, idx) => {
                        return (
                          <NavItem
                            key={idx}
                            text={item.text}
                            href={item.href}
                          />
                        );
                      })}
                    </Container>
                    <PersonaItem sessionData={sessionData} />
                  </>
                ) : (
                  <Burger opened={opened} onClick={toggle} aria-label={label} />
                )}
                <Drawer
                  position="right"
                  opened={opened}
                  onClose={close}
                  //   transitionDuration={400}
                  id={"layout-drawer"}
                  styles={{
                    root: {},
                    body: {},
                  }}
                >
                  <Stack h={"100%"} justify={"space-between"}>
                    <Flex direction={"column"} gap={24} align={"center"}>
                      {navItems.map((item, idx) => {
                        return (
                          <NavItem
                            key={idx}
                            text={item.text}
                            href={item.href}
                          />
                        );
                      })}
                    </Flex>
                    <Space h={"xl"} />
                    <Divider />
                    <ColorSchemeToggle />
                    <LogoutButton />
                  </Stack>
                </Drawer>
              </Flex>
            </Header>
          }
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}
        >
          <main>{children}</main>
        </AppShell>
      </main>
    </>
  );
};

export default Layout;
