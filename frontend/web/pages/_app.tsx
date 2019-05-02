import React from 'react'
import { Container, AppProps, DefaultAppIProps } from 'next/app'
import Layout from '../components/layout'

function App({ Component, pageProps }: AppProps & DefaultAppIProps) {
  return (
    <Container>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Container>
  )
}

App.getInitialProps = async ({
  Component,
  ctx
}: AppProps & DefaultAppIProps) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {}

  return { pageProps }
}

export default App
