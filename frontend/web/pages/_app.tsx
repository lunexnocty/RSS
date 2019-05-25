import React from 'react';
import { Container, AppProps, DefaultAppIProps } from 'next/app';
import UserProvider from '../context/user';
import LoginProvider from '../context/login';

function App({ Component, pageProps }: AppProps & DefaultAppIProps) {

  return (
    <Container>
      <LoginProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </LoginProvider>
    </Container>
  );
}

App.getInitialProps = async ({
  Component,
  ctx
}: AppProps & DefaultAppIProps) => {

  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};

  return { pageProps };
};

export default App;
