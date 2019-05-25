import auth from '../shared/utils/auth';
import { useState } from 'react';
import styled from 'styled-components';
import WithBackground from '../components/layout/background';
import InputRow from '../components/inputRow';
import Router from 'next/router';
import SubmitButton from '../components/SubmitButton';
import { useSpring, animated } from 'react-spring';
import ErrorInfo from '../components/errorInfo';
import Link from 'next/link';

export const SwitchLink = styled.p`
  text-align: right;
  margin-bottom: 0;
  color: steelblue;
`;

export const Message = styled.h2``;

export default function SignIn() {
  const init = {
    info: '',
    error: '',
    username: '',
    password: ''
  };
  type State = typeof init;
  const [state, set] = useState(init);
  const [opacityProps, setOpacity] = useSpring(() => ({
    display: 'block'
  }));

  const onInput = (key: keyof State, value: string) => {
    set({
      ...state,
      [key]: value
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await auth.signin(state);
    if (res.status !== 200) {
      set({ ...state, error: res.error });
    } else {
      setOpacity({ display: 'none' });
      set({ ...state, info: `Hello, ${res.user.username}` });
      auth.setProfile(res.user);
      setTimeout(() => Router.replace('/'), 1000);
    }
  };

  return (
    <WithBackground color={20}>
      <Message>{state.info}</Message>
      <animated.form onSubmit={onSubmit} style={opacityProps}>
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
      </animated.form>
    </WithBackground>
  );
}
