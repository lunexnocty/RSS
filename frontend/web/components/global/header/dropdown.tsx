import styled from 'styled-components'
import Link from 'next/link'
import { logout } from '../../../shared/utils/auth'

type DropdownProps = {
  username: string;
  role: string;
};

const DropdownWrapper = styled.ul`
  position: absolute;
  bottom: -4rem;
  right: 0;
  font-size: 1rem;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 0 5px #ccc;
  width: 8rem;
`

export default function Dropdown({ username, role }: DropdownProps) {
  return (
    <DropdownWrapper>
      <li>{username}</li>
      <li>{role}</li>
      <li onClick={() => logout()}>
        <Link href="/login">
          <a>退出登录</a>
        </Link>
      </li>
    </DropdownWrapper>
  )
}
