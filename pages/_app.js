import ColorTheme from "@/context/ColorTheme";
import Context from "@/context/Context";
import InfoContext from "@/context/InfoContext";
import StatusContext from "@/context/StatusContext";
import "@/styles/globals.scss";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <InfoContext>
        <Context>
          <StatusContext>
            <ColorTheme>
              <Component {...pageProps} />
            </ColorTheme>
          </StatusContext>
        </Context>
      </InfoContext>
    </SessionProvider>
  );
}
