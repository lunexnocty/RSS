import styled from 'styled-components'
import role from '../../shared/utils/role'
import { LinkProps } from '../../shared/types'
import SidebarLayout from '../../components/layout/sidebarLayout'

type SourceMangeProps = {
  links: LinkProps[];
};

function SourceMange({ links }: SourceMangeProps) {
  return (
    <SidebarLayout links={links}>
      <h1>History page</h1>
    </SidebarLayout>
  )
}

SourceMange.getInitialProps = () => {
  const links = role.getSidebarLinksByRole()
  return { links }
}

export default SourceMange
