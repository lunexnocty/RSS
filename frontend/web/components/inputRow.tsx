import styled from 'styled-components'
import { useState } from 'react'

const InputWrapper = styled.li`
  width: 80%;
  margin: 0 auto 2rem;
  height: 1.6rem;
  font-size: 1.2rem;
  position: relative;
`

const InputLabel = styled.label`
  transition: 0.3s all ease-in-out;
  position: absolute;
  padding: 5px;
  left: 0;
  top: 0;
  color: #ccc;
`

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
  &:focus + label {
    color: #000;
    transform: translateY(-1.4rem);
    font-size: 0.8rem;
  }
`

type InputProps = {
  label: string;
  type: string;
  id: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
};

export default function InputRow({ id, label, type, onChange }: InputProps) {
  const [text, set] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    set(e.target.value)
    onChange(e)
  }
  return (
    <InputWrapper>
      <InputField id={id} onChange={handleChange} type={type} />
      {!text && <InputLabel htmlFor={id}>{label}</InputLabel>}
    </InputWrapper>
  )
}
