import { SessionProvider } from "next-auth/react";

import "../styles/index.css";
import "../styles/reset.min.css";

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default App;
