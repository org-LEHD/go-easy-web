import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import {
  MantineProvider,
  ColorSchemeProvider,
  type ColorScheme,
} from "@mantine/core";
import { api } from "../utils/api";
import "~/styles/globals.css";
import Layout from "../common/components/Layout";
import { useState } from "react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value ?? (colorScheme === "dark" ? "light" : "dark"));

  return (
    <SessionProvider session={session}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withNormalizeCSS
          withGlobalStyles
          theme={{ colorScheme }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
