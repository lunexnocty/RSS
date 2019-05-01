import styled, { createGlobalStyle } from 'styled-components'
import Header from './header'
import Footer from './footer'
import Sidebar from './sidebar'
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

`

const PageMain = styled.main`
  flex-grow: 1;
`
const Flex = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
`

const Top = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`

export default function Layout({ children }: any) {
  return (
    <>
      <GlobalStyle />
      <Top>
        <Header />
        <Flex>{children}</Flex>
      </Top>
      <Footer />
    </>
  )
}
