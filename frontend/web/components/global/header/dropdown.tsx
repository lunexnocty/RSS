import styled from "styled-components";
import Link from "next/link";
import auth from "../../../shared/utils/auth";

type DropdownProps = {
  username: string;
  role: string;
};

const DropdownWrapper = styled.ul`
  position: absolute;
  bottom: -7rem;
  right: 0;
  font-size: 1rem;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 0 5px #ccc;
  width: 8rem;
  z-index: 10;
  cursor: pointer;
`;

export default function Dropdown({ username, role }: DropdownProps) {
  return (
    <DropdownWrapper>
      <li>{username}</li>
      <li>{role}</li>
      <li>
        <hr />
      </li>
      <li onClick={() => auth.logout()}>
        <Link href="/login">
          <a>退出登录</a>
        </Link>
      </li>
    </DropdownWrapper>
  );
}
