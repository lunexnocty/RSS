import React from 'react'
import styled from 'styled-components/native'
import Layout from '../components/layout'
import { NavigatorDefaultScreenProps } from '../types'
const Title = styled.Text`

`

export default function Index({ navigation }: NavigatorDefaultScreenProps) {

  const onPress = () => {
    navigation.navigate('Login')
  }
  return (
    <Layout>
      <Title onPress={onPress}>Home</Title>
    </Layout>
  )
}

Index.navigationOptions = {
  title: 'Home',
}
