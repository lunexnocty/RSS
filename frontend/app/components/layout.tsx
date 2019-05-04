import React from 'react'
import styled from 'styled-components/native'

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`

const Footer = styled.View`
background-color: #eee;
align-self: stretch;
align-items: center;
justify-content: center;
height: 60;
`

const Main = styled.ScrollView`

`

const FooterText = styled.Text`

`

export default function Layout({ children }: any) {
  return (
    <Container>
      <Main>{children}</Main>
      <Footer>
        <FooterText>FooterText!</FooterText>
      </Footer>
    </Container>
  )
}