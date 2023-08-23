import { signIn, signOut, useSession } from "next-auth/react";
import { Button, Container, Center, Text, Divider, Flex } from "@mantine/core";
const Login: React.FC = () => {
  return (
    <Container
      pl="xl"
      p="md"
      pr="xl"
      h="100%"
      className="rounded-lg bg-white drop-shadow-lg"
    >
      <Flex direction={"column"} gap="md">
        <Text>You need to be logged in to access this content</Text>
        <Divider />
        <Center>
          <LoginButton />
        </Center>
      </Flex>
    </Container>
  );
};
export default Login;

export const LoginButton: React.FC = () => {
  const { data: sessionData } = useSession();
  return (
    <Button
      className={"bg-blue-600"}
      onClick={sessionData ? () => void signOut() : () => void signIn()}
    >
      {sessionData ? "Sign out" : "Sign in"}
    </Button>
  );
};
