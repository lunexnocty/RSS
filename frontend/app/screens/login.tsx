import React from 'react'
import styled from 'styled-components/native'
import { NavigatorDefaultScreenProps } from '../types'
import Button from '../components/button'
import Input from '../components/input'

const Form = styled.View`
width: 80%;
margin-top: 200px;
align-self: center;
display:flex;
justify-content: center;
`
const ButtonWrapper = styled.View`
margin-top: 50;
`
const init = {
  username: '',
  password: ''
}
type State = typeof init;

export default class Login extends React.Component<NavigatorDefaultScreenProps> {

  constructor(props: NavigatorDefaultScreenProps<State>) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }
    static navigationOptions = {
      title: '放射源管理系统',
    };


    onInput = (key: keyof State, value: string) => {
      this.setState({
        ...this.state,
        [key]: value
      })
    };

    onPress = () => {
      console.log('pressed!')
      this.props.navigation.navigate('Home')
    };

    render() {
      return (
        <Form>

          <Input onChange={text => this.onInput('username', text)}
            label={'用户名'} />
          <Input onChange={text => this.onInput('password', text)}
            label={'密码'} />
          <ButtonWrapper onPress={this.onPress}>
            <Button>登录</Button>
          </ButtonWrapper>
        </Form>)
    }
}