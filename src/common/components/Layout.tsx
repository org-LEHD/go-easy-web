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
import { Access, Role } from "@prisma/client";

type Props = {
  children: ReactElement;
};

const Layout: React.FC<Props> = ({ children }) => {
  const matches = useMediaQuery("(min-width: 576px)");
  const { data: sessionData } = useSession();

  const [opened, { toggle, close }] = useDisclosure(false);
  const label = opened ? "Close navigation" : "Open navigation";
  const isGrantedAccess = sessionData?.user.access == Access.Granted;
  const navItems: NavItemProps[] = useMemo(() => {
    if (sessionData?.user?.role === Role.Administrator) {
      return [
        { text: "Konto", href: "/account" },
        { text: "Anmodninger", href: "/requests" },
        { text: "Annoncører", href: "/advertisers" },
        { text: "Seværdigheder", href: "/attractions" },
      ];
    } else {
      if (isGrantedAccess) {
        return [
          { text: "Konto", href: "/account" },
          { text: "Lokationer", href: "/locations" },
          { text: "Annoncer", href: "/advertisements" },
        ];
      } else {
        return [{ text: "Konto", href: "/account" }];
      }
    }
  }, [sessionData?.user?.role, isGrantedAccess]);

  return (
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
                      <NavItem key={idx} text={item.text} href={item.href} />
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
                      <NavItem key={idx} text={item.text} href={item.href} />
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
      styles={() => ({
        main: {
          overflowY: "hidden",
        },
      })}
    >
      {children}
    </AppShell>
  );
};

export default Layout;
