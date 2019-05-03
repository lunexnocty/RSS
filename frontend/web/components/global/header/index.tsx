import styled from "styled-components";
import Link from "next/link";
import { useReducer, useEffect } from "react";
import role from "../../../shared/utils/role";
import Dropdown from "./dropdown";
import auth from "../../../shared/utils/auth";
const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  box-shadow: 0 0 10px #aaa;
  font-size: 1.4rem;
`;
const HeaderName = styled.span`
  font-size: inherit;
  padding: 0 20px;
`;

type SettingsButtonWrapperProps = {
  isloggedIn: boolean;
};

const SettingsButtonWrapper = styled.div<SettingsButtonWrapperProps>`
  position: relative;
  font-size: inherit;
  display: ${props => (props.isloggedIn ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default function GlobalHeader() {
  const init = { showDropdown: false };
  type State = typeof init;
  type Action = "close" | "toggle";
  const rolename = role.get();

  const reducer = (prev: State, action: Action): State => {
    switch (action) {
      case "close":
        return { showDropdown: false };
        break;
      case "toggle":
        return { showDropdown: !prev.showDropdown };
    }
  };

  const [state, dispatch] = useReducer(reducer, init);

  if (process.browser) {
    const iconRef = document.getElementById("settings");
    useEffect(() => {
      window.addEventListener("click", e => {
        if (e.target !== iconRef) {
          dispatch("close");
        }
      });
    }, []);
  }
  return (
    <HeaderWrapper>
      <Link href="/">
        <a>
          <HeaderName>放射源管理系统</HeaderName>
        </a>
      </Link>

      <SettingsButtonWrapper
        isloggedIn={auth.isloggedIn()}
        onClick={() => dispatch("toggle")}
      >
        <i id={"settings"} className="fas fa-cogs" />
        {state.showDropdown && <Dropdown username={"用户名"} role={rolename} />}
      </SettingsButtonWrapper>
    </HeaderWrapper>
  );
}
