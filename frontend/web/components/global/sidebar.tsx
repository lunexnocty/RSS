import styled from 'styled-components'
import { LinkProps } from '../../shared/types'
import role from '../../shared/utils/role'
import Link from 'next/link'
const GlobalSidebar = styled.aside`
  min-width: 200px;
  width: 20%;
`

type SidebarProps = {
  links: LinkProps[];
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
  padding: 5px 10px;
  text-align: left;
  background-color: ${props => (props.active ? '#eee' : 'none')};
  &:hover {
    background-color: #eee;
  }
`

function Sidebar({ links, active }: SidebarProps) {
  return (
    <GlobalSidebar>
      <SidebarLinkList>
        {links.map((link, i) => (
          <LinkItem key={`sidebar-${i}`} active={link.name === active}>
            <Link href={link.url}>
              <a>{link.name}</a>
            </Link>
          </LinkItem>
        ))}
      </SidebarLinkList>
    </GlobalSidebar>
  )
}

export default Sidebar
