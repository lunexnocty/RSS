import styled from 'styled-components';

const Nav = styled.nav`
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const NavButton = styled.button`
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  padding: 5px 1rem;
  margin: 0;
  color: #000;
  border-radius: 10px;
  border: 0;
  transition: 0.3s all ease-in-out;
  background-color: #eee;

  &:active {
    background-color: #ccc;
  }

  &:focus {
    outline: none;
  }
`;
type PaginationProps = {
  current: number;
  changeOffset(action: string): void;
};

export default function Pagination({ current, changeOffset }: PaginationProps) {
  const back = () => {
    changeOffset('back');
  };

  const forth = () => {
    changeOffset('forth');
  };

  return (
    <Nav>
      <NavButton onClick={back}>{'<'}</NavButton>第{current + 1}页
      <NavButton onClick={forth}>{'>'}</NavButton>
    </Nav>
  );
}
