import styled from 'styled-components';

type IconProps = {
  className: string;
};

const StyledIcon = styled.i`
  &::before {
    color: ${props => props.theme.icon};
  }
`;
export default function Icon({ className }: IconProps) {
  return <StyledIcon className={className} />;
}
