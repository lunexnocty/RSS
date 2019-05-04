import HomeScreen from './screens/home'
import LoginScreen from './screens/login'
import LoadingScreen from './screens/loading'
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation'

const AuthStack = createStackNavigator({ Login: { screen: LoginScreen } })
const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
})

const App = createAppContainer(createSwitchNavigator({
  loading: LoadingScreen,
  App: MainNavigator,
  Auth: AuthStack,
}))

export default App
