import Context from "@/context/context";
import InfoContext from "@/context/infoContext";
import StatusContext from "@/context/StatusContext";
import "@/styles/globals.scss";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <InfoContext>
        <Context>
          <StatusContext>
            <Component {...pageProps} />
          </StatusContext>
        </Context>
      </InfoContext>
    </SessionProvider>
  );
}
