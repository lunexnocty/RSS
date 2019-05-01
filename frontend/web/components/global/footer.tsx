import styled from 'styled-components'

const FooterWrapper = styled.footer`
  display: flex;
  background-color: #eee;
  justify-content: space-around;
`
const Copyrignt = styled.span`
  font-size: 1.2rem;
`

export default function GlobalFooter() {
  return (
    <FooterWrapper>
      <Copyrignt>Copyright ©__US__ {new Date().getFullYear()}</Copyrignt>
    </FooterWrapper>
  )
}
