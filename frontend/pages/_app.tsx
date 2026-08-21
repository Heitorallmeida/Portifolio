import Head from "next/head";
import type { AppProps } from "next/app";
import globalStyles from "../styles/global";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Portifolio</title>
        <meta name="description" content="Portifolio de software engineering" />
      </Head>
      <style jsx global>{globalStyles}</style>
      <Component {...pageProps} />
    </>
  );
}
