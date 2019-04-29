import React from "react";
import { Container, AppProps, DefaultAppIProps } from "next/app";
import Layout from "../components/global/layout";

export default function App({
  Component,
  pageProps
}: AppProps & DefaultAppIProps) {
  return (
    <Container>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Container>
  );
}
