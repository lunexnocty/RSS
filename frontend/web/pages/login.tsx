import styled from 'styled-components'
import { useState } from 'react'
import Router from 'next/router'
import { colors } from '../shared/theme'
const LoginWrapper = styled.div`
  margin: 5rem auto auto;
  padding: 1rem;
  min-width: 20rem;
  box-shadow: 2px 2px 10px #ccc;
`

const InputRow = styled.li`
  width: 80%;
  margin: 2.5rem auto;
  height: 1.6rem;
  font-size: 1.4rem;
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
  padding: 5px;
  &:focus + label {
    color: #000;
    transform: translateY(-1.4rem);
    font-size: 0.8rem;
  }
`

const LoginButton = styled.button`
  background-color: #eee;
  font-size: 1.5rem;
  border: 0;
`

export default function Login() {
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
    Router.push('/')
  }

  return (
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
        </ul>
        <LoginButton onclick="submit">登录</LoginButton>
      </form>
    </LoginWrapper>
  )
}
