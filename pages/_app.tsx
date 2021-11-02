import "../styles/globals.scss";
import type { AppProps } from "next/app";
import "../utils/font-awesome";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Generátor rodného čísla</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
