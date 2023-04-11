import "../styles/globals.css";
import { Provider } from "../context/store";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider>
        <Component {...pageProps} />;
        <Head>
          <title>Drivercity</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/a.png" />
        </Head>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
