import styled, { createGlobalStyle } from 'styled-components';
import Header from '../global/header';
import Footer from '../global/footer';
import theme from '../../shared/theme';
import { ThemeProvider } from 'styled-components';
import Sidebar from '../global/sidebar';
import Protected from '../protected';
const GlobalStyle = createGlobalStyle`
*{
  transition: all .3s cubic-bezier(0.46, 0.03, 0.52, 0.96);
}
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
  color: inherit;
  text-decoration: none;
}
#__next {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.swal2-popup #swal2-content {
            white-space: pre-wrap;
          }

`;

export const Flex = styled.div`
  display: flex;
  position: relative;
  flex-grow: 1;
  justify-content: space-between;
`;

const Top = styled.div`
  flex-grow: 1;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const PageMain = styled.main`
  flex-grow: 1;
`;

export function LayoutBase({ children }: any) {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Top>
          <Header />
          <Flex>{children}</Flex>
        </Top>
        <Footer />
      </>
    </ThemeProvider>
  );
}

export default function Layout({ children }: any) {
  return (
    <LayoutBase>
      <Sidebar />
      <PageMain>
        <Protected>{children}</Protected>
      </PageMain>
    </LayoutBase>
  );
}
