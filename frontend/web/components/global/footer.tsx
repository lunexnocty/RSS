import styled from 'styled-components';

const FooterWrapper = styled.footer`
  display: flex;
  justify-content: space-around;
  box-shadow: 0 0 5px #aaa;
`;
const Copyrignt = styled.span`
  font-size: 1rem;
  padding: 5px;
`;

export default function GlobalFooter() {
  return (
    <FooterWrapper>
      <Copyrignt>Copyright ©RSMS {new Date().getFullYear()}</Copyrignt>
    </FooterWrapper>
  );
}
