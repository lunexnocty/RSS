import React from 'react'
import { Container, AppProps, DefaultAppIProps } from 'next/app'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html,
  body {
    text-align: center;
    font-size: 20px;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  h1 {
    font-family: serif;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  a {
    text-decoration: none;
  }
  #__next {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

`

const Layout = ({ children }: any) => (
  <>
    <GlobalStyle />
    {children}
  </>
)

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
  )
}
