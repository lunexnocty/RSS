import styled from 'styled-components'
import role from '../../shared/utils/role'
import { LinkProps } from '../../shared/types'
import SidebarLayout from '../../components/layout/sidebarLayout'

type HistoryManageProps = {
  links: LinkProps[];
};

function HistoryManage({ links }: HistoryManageProps) {
  return (
    <SidebarLayout links={links}>
      <h1>HistoryManage page</h1>
    </SidebarLayout>
  )
}

HistoryManage.getInitialProps = () => {
  const links = role.getSidebarLinksByRole()
  return { links }
}

export default HistoryManage
