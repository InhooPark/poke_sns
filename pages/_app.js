import Context from "@/context/context";
import StatusContext from "@/context/StatusContext";
import "@/styles/globals.scss";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Context>
        <StatusContext>
          <Component {...pageProps} />
        </StatusContext>
      </Context>
    </SessionProvider>
  );
}
