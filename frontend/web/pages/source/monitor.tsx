import styled from 'styled-components'
import role from '../../shared/utils/role'
import { LinkProps } from '../../shared/types'
import SidebarLayout from '../../components/layout/sidebarLayout'

type MonitorProps = {
  links: LinkProps[];
};

function Monitor({ links }: IndexProps) {
  return (
    <SidebarLayout links={links}>
      <h1>Monitor page</h1>
    </SidebarLayout>
  )
}

Monitor.getInitialProps = () => {
  const links = role.getSidebarLinksByRole()
  return { links }
}

export default Monitor
