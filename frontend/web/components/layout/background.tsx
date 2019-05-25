import styled from 'styled-components';
import LazyBackground from '../loginBackground';
import { LayoutBase } from './index';

const LoginPage = styled.div`
  height: inherit;
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const LoginWrapper = styled.div`
  margin: 0;
  padding: 2rem;
  min-width: 20rem;
  box-shadow: 2px 2px 10px #ccc;
  background-color: rgba(255, 255, 255, 0.9);
`;
type withBackgroundProps = {
  children: any;
  color: number;
};

export default function WithBackground({
  children,
  color
}: withBackgroundProps) {
  return (
    <LayoutBase>
      <LoginPage>
        <LazyBackground color={color} />
        <LoginWrapper>{children}</LoginWrapper>
      </LoginPage>
    </LayoutBase>
  );
}
