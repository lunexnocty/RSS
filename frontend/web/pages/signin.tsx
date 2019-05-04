import auth from '../shared/utils/auth'
import { useState } from 'react'
import styled from 'styled-components'
import LoginLayout from '../components/layout/loginLayout'
import InputRow from '../components/inputRow'
import Router from 'next/router'
import SubmitButton from '../components/SubmitButton'
import ErrorInfo from '../components/ErrorInfo'
import Link from 'next/link'

export const SwitchLink = styled.p`
  text-align: right;
  margin-bottom: 0;
  color: steelblue;
`
export default function SignIn() {
  const init = {
    info: '',
    error: '',
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await auth.signin(state)
    if (res.status === 'failed') {
      set({ ...state, error: res.info })
    } else {
      set({ ...state, info: res.info })
      setTimeout(() => Router.replace('/'), 200)
    }
  }

  return (
    <LoginLayout>
      <form onSubmit={onSubmit}>
        <ul>
          <InputRow
            id="username"
            type="text"
            label="用户名或邮箱"
            onChange={e => onInput('username', e.target.value)}
          />

          <InputRow
            id="password"
            type="password"
            label="密码"
            onChange={e => onInput('password', e.target.value)}
          />
          <li>
            <ErrorInfo>{state.error}</ErrorInfo>
          </li>
          <li>
            <SubmitButton onclick="submit">登录</SubmitButton>
          </li>
        </ul>
        <SwitchLink>
          <Link href="/signup">
            <a>注册</a>
          </Link>
        </SwitchLink>
      </form>
    </LoginLayout>
  )
}
