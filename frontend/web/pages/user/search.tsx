import styled from 'styled-components'
import role from '../../shared/utils/role'
import { LinkProps } from '../../shared/types'
import SidebarLayout from '../../components/layout/sidebarLayout'

type SearchProps = {
  links: LinkProps[];
};

function Search({ links }: SearchProps) {
  return (
    <SidebarLayout links={links}>
      <h1>User Search page</h1>
    </SidebarLayout>
  )
}

Search.getInitialProps = () => {
  const links = role.getSidebarLinksByRole()
  return { links }
}

export default Search
