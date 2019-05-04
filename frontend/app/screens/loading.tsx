import React from 'react'
import auth from '../utils/auth'
import { NavigatorDefaultScreenProps } from '../types'
import {
  ActivityIndicator,
  StatusBar,
  View,
} from 'react-native'

export default class AuthLoadingScreen extends React.Component<NavigatorDefaultScreenProps> {

  constructor(props: any) {
    super(props)
    this.checkAuth()
  }
    static navigationOptions = {
      title: '登录'
    };


    checkAuth = async ()=> {
      const userToken = await auth.isloggedIn()
      this.props.navigation.navigate(userToken ? 'App' : 'Auth')
    }

    render() {
      return (<View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>)
    }

}
