import styled from 'styled-components';
import auth, { RoleID } from '../shared/utils/auth';
import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import InputRow from '../components/inputRow';
import Router from 'next/router';
import SubmitButton from '../components/SubmitButton';
import ErrorInfo from '../components/errorInfo';
import { SwitchLink } from './signin';
import Link from 'next/link';
import WithBackground from '../components/layout/background';

const OptionInput = styled.input`
  width: 0;
  height: 0;
  opacity: 0;
`;

type OptionLabelProps = {
  focus: boolean;
};

const OptionLabel = styled.label<OptionLabelProps>`
  cursor: pointer;
  padding: 5px;
  background: ${props => (props.focus ? 'skyblue' : '#fff')};
  color: #000;
`;

const Row = styled.li`
  margin-bottom: 2rem;
`;
export default function SignUp() {
  const init = {
    info: '',
    error: '',
    username: '',
    email: '',
    password: '',
    role_id: 3
  };
  type State = typeof init;
  const [state, set] = useState(init);

  const onInput = (key: keyof State, value: string) => {
    set({
      ...state,
      [key]: value
    });
  };

  const [opacityProps, setOpacity] = useSpring(() => ({
    display: 'block'
  }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await auth.signup({
      username: state.username,
      email: state.email,
      password: state.password,
      role_id: state.role_id as RoleID
    });
    if (res.status !== 100) {
      set({ ...state, error: res.error });
    } else {
      setOpacity({ display: 'none' });
      set({ ...state, info: res.information });

      setTimeout(() => Router.replace('/'), 500);
    }
  };

  return (
    <WithBackground color={40}>
      <h2>{state.info}</h2>
      <animated.form style={opacityProps} onSubmit={onSubmit}>
        <ul>
          <InputRow
            id="username"
            type="text"
            label="用户名"
            onChange={e => onInput('username', e.target.value)}
          />

          <InputRow
            id="email"
            type="text"
            label="邮箱"
            onChange={e => onInput('email', e.target.value)}
          />

          <InputRow
            id="password"
            type="password"
            label="密码"
            onChange={e => onInput('password', e.target.value)}
          />
          <Row>
            <div onChange={e => onInput('role_id', parseInt(e.target.value))}>
              <OptionInput id="role-3" type="radio" value="3" name="role" />
              <OptionLabel focus={state.role_id == '3'} htmlFor="role-3">
                普通用户
              </OptionLabel>
              <OptionInput id="role-2" type="radio" value="2" name="role" />
              <OptionLabel focus={state.role_id == '2'} htmlFor="role-2">
                放射源管理员
              </OptionLabel>
              <OptionInput id="role-1" type="radio" value="1" name="role" />
              <OptionLabel focus={state.role_id == '1'} htmlFor="role-1">
                用户管理员
              </OptionLabel>
            </div>
          </Row>
          <li>
            <ErrorInfo>{state.error}</ErrorInfo>
          </li>
          <li>
            <SubmitButton onclick="submit">注册</SubmitButton>
          </li>
        </ul>
        <SwitchLink>
          <Link href="/signin">
            <a>登陆</a>
          </Link>
        </SwitchLink>
      </animated.form>
    </WithBackground>
  );
}
