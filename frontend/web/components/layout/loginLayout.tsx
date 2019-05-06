import styled from 'styled-components'
import LazyBackground from '../loginBackground'

const LoginPage = styled.div`
  height: inherit;
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
`

const LoginWrapper = styled.div`
  margin: 0;
  padding: 2rem;
  min-width: 20rem;
  box-shadow: 2px 2px 10px #ccc;
  background-color: rgba(255, 255, 255, 0.9);
`

export default function LoginLayout({ children, color }: any) {
  return (
    <LoginPage>
      <LazyBackground color={color} />
      <LoginWrapper>{children}</LoginWrapper>
    </LoginPage>
  )
}
