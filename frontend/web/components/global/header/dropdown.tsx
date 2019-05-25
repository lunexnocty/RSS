import styled from 'styled-components';
import Link from 'next/link';
import auth from '../../../shared/utils/auth';
import { userContext } from '../../../context/user';
import { useContext } from 'react';

const DropdownWrapper = styled.ul`
  position: absolute;
  bottom: -11rem;
  right: 0;
  font-size: 1rem;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px #555;
  width: 8rem;
  z-index: 10;
  cursor: pointer;
`;

const Avatar = styled.img`
  width: 30%;
  margin: 0 auto;
`;
export default function Dropdown() {
  const user = useContext(userContext);
  return (
    <DropdownWrapper>
      <li>
        <Avatar src={user.avatar} />
      </li>
      <li>{user.name}</li>
      <li>{user.role}</li>
      <li>
        <hr />
      </li>
      <li>
        <Link href={'/settings'}>
          <a>设置</a>
        </Link>
      </li>
      <li onClick={() => auth.logout()}>
        <Link href="/signin">
          <a>退出登录</a>
        </Link>
      </li>
    </DropdownWrapper>
  );
}
