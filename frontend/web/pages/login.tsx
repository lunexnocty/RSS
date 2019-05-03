import styled from 'styled-components'
import auth from '../shared/utils/auth'
import { useState } from 'react'
import LazyBackground from '../components/loginBackground'

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

const InputRow = styled.li`
  width: 80%;
  margin: 0 auto 2rem;
  height: 1.6rem;
  font-size: 1.2rem;
  position: relative;
`

const InputLabel = styled.label`
  transition: 0.3s all ease-in-out;
  position: absolute;
  padding: 5px;
  left: 0;
  top: 0;
  color: #ccc;
`

const InputField = styled.input`
  width: 100%;
  height: 100%;
  font-size: inherit;
  border: none;
  border-bottom: 2px solid #ccc;
  padding: 5px;
  &:focus {
    outline: none;
    border-bottom: 2px solid skyblue;
  }
  &:focus + label {
    color: #000;
    transform: translateY(-1.4rem);
    font-size: 0.8rem;
  }
`

const LoginButton = styled.button`
  background-color: #fff;
  font-size: 1.2rem;
  border: 0;
  padding: 5px 20px;
  width: 80%;
  cursor: pointer;
  border: 2px solid skyblue;
  &:hover {
    background-color: skyblue;
  }
`

function Login() {
  const init = {
    username: '',
    password: ''
  }
  type State = typeof init;
  const [state, set] = useState(init)

  const onInput = (key: keyof State, value: string) => {
    set({
      ...state,
      [key]: value
    })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    auth.login(state)
  }

  return (
    <LoginPage>
      <LazyBackground />
      <LoginWrapper>
        <form onSubmit={onSubmit}>
          <ul>
            <InputRow>
              <InputField
                id="username"
                onChange={e => onInput('username', e.target.value)}
                type="text"
              />
              {!state.username && (
                <InputLabel htmlFor="username">用户名</InputLabel>
              )}
            </InputRow>
            <InputRow>
              <InputField
                id="password"
                onChange={e => onInput('password', e.target.value)}
                type="password"
              />
              {!state.password && (
                <InputLabel htmlFor="password">密码</InputLabel>
              )}
            </InputRow>
            <InputRow>
              <LoginButton onclick="submit">登录</LoginButton>
            </InputRow>
          </ul>
        </form>
      </LoginWrapper>
    </LoginPage>
  )
}

export default Login
