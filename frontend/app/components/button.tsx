import React from 'react'
import styled from 'styled-components/native'

const ButtonWrapper = styled.TouchableOpacity`
  background-color: #fff;
  padding: 5px 20px;
  border: 2px solid skyblue;
`
const ButtonText = styled.Text`
  text-align: center;
  font-size: 24;
`

export default function Button({ children }: any) {
  return (
    <ButtonWrapper>
      <ButtonText>{children}</ButtonText>
    </ButtonWrapper>
  )
}