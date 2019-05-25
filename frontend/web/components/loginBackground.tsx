import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

type DoodleProps = {
  color: number;
};

const Doodle = ({ color }: DoodleProps) => (
  <>
    <css-doodle>{`color: #fff;
:host{
margin: auto auto;
}
:doodle {
  @grid: 1x10 / 600px;
}
@keyframes r {
  to { transform: rotate(1turn) }
}
:container{
  opacity: .7;
}
animation: r 60s linear infinite;
@place-cell: center;
@size: calc(@i() * 20%);
border-radius: 50%;
border-style: dashed;
border-width: calc(@i() * 7px);
border-color: hsla(
  calc(${color} * @i()), 70%, 68%,
  calc(6 / @i() * .8)
);
transform: rotate(@r(360deg));
`}</css-doodle>
  </>
);

const BackgroundWrapper = styled(animated.div)`
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  top: 0;
  overflow: hidden;
  left: 0;
  z-index: -1;
`;

export default function LoginBackground({ color }: DoodleProps) {
  const backgroundStyle = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 200 }
  });

  return (
    <BackgroundWrapper style={backgroundStyle}>
      <Doodle color={color}/>
    </BackgroundWrapper>
  );
}
