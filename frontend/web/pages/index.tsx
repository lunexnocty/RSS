import styled from 'styled-components'
import role from '../shared/utils/role'
import { LinkProps } from '../shared/types'
import SidebarLayout from '../components/layout/sidebarLayout'
const IndexWrapper = styled.h1`
  background-color: hotpink;
`

type IndexProps = {
  links: LinkProps[];
};

function Index({ links }: IndexProps) {
  return (
    <SidebarLayout links={links}>
      <IndexWrapper>Home page</IndexWrapper>
    </SidebarLayout>
  )
}

Index.getInitialProps = () => {
  const links = role.getSidebarLinksByRole()
  return { links }
}

export default Index
