import { useContext } from "react";
import { userContext } from "../../context/user";
import { sidebarMap } from "../../shared/utils/role";
import styled from "styled-components";
import Link from "next/link";
import Icon from "../icon";

const GlobalSidebar = styled.aside`
  min-width: 210px;
  width: 20%;
`;

type LinkItemProps = {
  active: boolean;
};

const SidebarLinkList = styled.ul`
  position: sticky;
  margin-top: 1rem;
`;

const LinkItem = styled.li<LinkItemProps>`
  padding: 5px 5px 5px 20px;
  text-align: left;
  background-color: ${props => (props.active ? "#eee" : "none")};
  a {
    display: block;
  }
  &:hover {
    background-color: #eee;
  }
`;
const LinkItemText = styled.span``;

function Sidebar() {
  const user = useContext(userContext);
  const links = sidebarMap[user.role];
  return (
    <GlobalSidebar>
      <SidebarLinkList>
        {links &&
          links.map((link, i) => (
            <LinkItem key={`sidebar-${i}`} active={false}>
              <Link href={link.url}>
                <a>
                  <Icon className={link.icon} />
                  <LinkItemText> {link.name}</LinkItemText>
                </a>
              </Link>
            </LinkItem>
          ))}
      </SidebarLinkList>
    </GlobalSidebar>
  );
}

export default Sidebar;
