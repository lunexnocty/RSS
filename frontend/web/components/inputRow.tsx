import styled from 'styled-components';
import { useState } from 'react';

export const InputWrapper = styled.li`
  width: 80%;
  margin: 0 auto 2rem;
  height: 1.6rem;
  font-size: 1.2rem;
  position: relative;
`;

type InputLabelProps = {
  focus: boolean;
};

const InputLabel = styled.label<InputLabelProps>`
  transition: 0.3s all ease-in-out;
  position: absolute;
  padding: 5px;
  left: 0;
  top: 0;
  color: ${props => (props.focus ? '#000' : '#ccc')};
  transform: ${props => (props.focus ? 'translateY(-1.4rem)' : '')};
  font-size: ${props => (props.focus ? '0.8rem' : 'inherit')};
`;

const InputField = styled.input`
  width: 100%;
  height: 100%;
  font-size: inherit;
  border: none;
  border-bottom: 2px solid #ccc;
  padding: 5px;
  &:focus {
    outline: none;
    border-bottom: 2px solid skyblue;
  }
`;

type InputProps = {
  label: string;
  type: string;
  id: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
};

export default function InputRow({ id, label, type, onChange }: InputProps) {
  const [focus, setFocus] = useState(false);
  const [text, set] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    set(e.target.value);
    onChange(e);
  };

  return (
    <InputWrapper>
      <InputField
        id={id}
        onChange={handleChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        type={type}
      />
      <InputLabel focus={focus | !!text} htmlFor={id}>
        {label}
      </InputLabel>
    </InputWrapper>
  );
}
