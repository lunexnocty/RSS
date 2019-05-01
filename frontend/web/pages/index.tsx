import styled from 'styled-components'
import Sidebar from '../components/global/sidebar'
const IndexWrapper = styled.h1`
  background-color: hotpink;
`

const PageMain = styled.main`
  flex-grow: 1;
`
export default () => (
  <>
    <Sidebar />
    <PageMain>
      <IndexWrapper>Home page</IndexWrapper>
    </PageMain>
  </>
)
