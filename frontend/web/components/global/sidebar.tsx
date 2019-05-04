import styled from 'styled-components'
import { sidebarLinkProps } from '../../shared/utils/role'
import Link from 'next/link'
import Icon from '../icon'
const GlobalSidebar = styled.aside`
  min-width: 200px;
  width: 20%;
`

type SidebarProps = {
  links: sidebarLinkProps[];
  active: string;
};
type LinkItemProps = {
  active: boolean;
};

const SidebarLinkList = styled.ul`
  position: sticky;
  margin-top: 1rem;
`

const LinkItem = styled.li<LinkItemProps>`
  padding: 5px 5px 5px 20px;
  text-align: left;
  background-color: ${props => (props.active ? '#eee' : 'none')};
  a {
    display: block;
  }
  &:hover {
    background-color: #eee;
  }
`
const LinkItemText = styled.span``

function Sidebar({ links, active }: SidebarProps) {
  return (
    <GlobalSidebar>
      <SidebarLinkList>
        {links.map((link, i) => (
          <LinkItem key={`sidebar-${i}`} active={link.name === active}>
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
  )
}

export default Sidebar
