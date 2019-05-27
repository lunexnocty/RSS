import styled from 'styled-components';

type AvailabilityProps = {
  availabile: boolean;
};

export const AvailabilityWrapper = styled.span<AvailabilityProps>`
  font-family: sans-serif;
  font-weight: bold;
  padding: 5px 1rem;
  border-radius: 5px;
  color: #fff;
  background-color: ${props => (props.availabile ? '#9ccc65' : '#e91e63')};
`;
const Availability = ({ availabile }: AvailabilityProps) => {
  return (
    <AvailabilityWrapper availabile={availabile}>
      {availabile ? '✔' : 'X'}
    </AvailabilityWrapper>
  );
};

export default Availability;
