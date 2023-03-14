import ColorTheme from "@/context/ColorTheme";
import Context from "@/context/Context";
import InfoContext from "@/context/InfoContext";
import StatusContext from "@/context/StatusContext";
import "@/styles/globals.scss";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StatusContext>
        <InfoContext>
          <Context>
            <ColorTheme>
              <Component {...pageProps} />
            </ColorTheme>
          </Context>
        </InfoContext>
      </StatusContext>
    </SessionProvider>
  );
}
