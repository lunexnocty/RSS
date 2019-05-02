import styled from 'styled-components'
import Link from 'next/link'
import { LinkProps } from '../../shared/types'
const HeaderWrapper = styled.header`
  display: flex;
  background-color: #eee;
  justify-content: space-between;
  padding: 5px;
  box-shadow: 0 0 10px #aaa;
`
const HeaderName = styled.span`
  font-size: 2rem;
`

type NavigatorProps = {
  links: LinkProps[];
};

const NavigatorList = styled.ul`
  display: flex;
  height: 100%;
  align-items: center;
`

const Navigator = ({ links }: NavigatorProps) => (
  <nav>
    <NavigatorList>
      <li>
        {links.map((link, i) => (
          <Link key={`nav-${i}`} href={link.url}>
            <a>{link.name}</a>
          </Link>
        ))}
      </li>
    </NavigatorList>
  </nav>
)

export default function GlobalHeader() {
  return (
    <HeaderWrapper>
      <Link href="/">
        <a>
          <HeaderName>放射源管理系统</HeaderName>
        </a>
      </Link>
      <Navigator links={[{ url: '/login', name: '退出登录' }]} />
    </HeaderWrapper>
  )
}
