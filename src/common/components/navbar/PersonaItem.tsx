import {
    ActionIcon,
    Avatar,
    Text,
    Flex,
    Container,
    Menu,
    Button,
    Center,
  } from "@mantine/core";
  import { LoginButton } from "../../../pages/login";
  import type { Session } from "next-auth";
  import { IconLogout } from "@tabler/icons";
  import { signIn } from "next-auth/react";
  import { ColorSchemeToggle } from "./ColorSchemeToggle";
  import { LogoutButton } from "./LogoutButton";
  
  export type PersonaItemProps = {
    sessionData: Session | null;
  };
  
  export const PersonaItem: React.FC<PersonaItemProps> = ({ sessionData }) => {
    if (sessionData === null) {
      return <LoginButton />;
    } else {
      return (
        <Container
          style={{ marginLeft: "auto", display: "flex", marginRight: "unset" }}
        >
          <Text m="auto" pr="xs">
            {sessionData?.user?.name}
          </Text>
          <Flex m="auto" direction={"row"}>
            <Menu width={200}>
              <Menu.Target>
                <ActionIcon>
                  <Avatar
                    src={sessionData?.user?.image}
                    alt={"Your account Icon"}
                    radius={"xl"}
                  />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item component="div">
                  <ColorSchemeToggle />
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item component="div">
                  <LogoutButton />
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        </Container>
      );
    }
  };
  