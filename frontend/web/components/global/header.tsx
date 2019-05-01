import styled from "styled-components";
import Link from "next/link";
const HeaderWrapper = styled.header`
  display: flex;
  background-color: #eee;
  justify-content: space-between;
  padding: 5px;
`;
const HeaderName = styled.span`
  font-size: 2rem;
`;

export default function GlobalHeader() {
  return (
    <HeaderWrapper>
      <Link href="/">
        <a>
          <HeaderName>放射源管理系统</HeaderName>
        </a>
      </Link>
    </HeaderWrapper>
  );
}
