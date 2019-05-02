import styled from 'styled-components'
import Sidebar from '../global/sidebar'
import { LinkProps } from '../../shared/types'

const PageMain = styled.main`
  flex-grow: 1;
`

type IndexProps = {
  links: LinkProps[];
  children: any;
};

function Index({ children, links }: IndexProps) {
  return (
    <>
      <Sidebar links={links} active={'test'} />
      <PageMain>{children}</PageMain>
    </>
  )
}

export default Index
