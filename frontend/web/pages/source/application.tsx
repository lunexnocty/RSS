import styled from 'styled-components'
import role from '../../shared/utils/role'
import { LinkProps } from '../../shared/types'
import SidebarLayout from '../../components/layout/sidebarLayout'

type ApplicationProps = {
  links: LinkProps[];
};

function Application({ links }: ApplicationProps) {
  return (
    <SidebarLayout links={links}>
      <h1>Apply page</h1>
    </SidebarLayout>
  )
}

Application.getInitialProps = () => {
  const links = role.getSidebarLinksByRole()
  return { links }
}

export default Application
