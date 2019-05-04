import styled from 'styled-components'
import role from '../../shared/utils/role'
import { LinkProps } from '../../shared/types'
import SidebarLayout from '../../components/layout/sidebarLayout'

type HistoryProps = {
  links: LinkProps[];
};

function History({ links }: HistoryProps) {
  return (
    <SidebarLayout links={links}>
      <h1>History page</h1>
    </SidebarLayout>
  )
}

History.getInitialProps = () => {
  const links = role.getSidebarLinksByRole()
  return { links }
}

export default History
