import api from '../../web/shared/api'
import {  AsyncStorage} from 'react-native'
export const cookieItems = {
  token: 'token',
  profile: 'profile'
}

export interface LoginResponse extends Response {
  token: string;
}

export interface ProfileResponse extends Response {
  profile: object;
}
type LoginParams = {
  username: string;
  password: string;
};
async function login({ username, password }: LoginParams) {
  const res = await api.post<LoginResponse>('/login', {
    username,
    password
  })

  AsyncStorage.setItem(cookieItems.token, res.token)
  await setProfile()
}

async function setProfile() {
  const res = await api.get<ProfileResponse>('/user')
  AsyncStorage.setItem(cookieItems.profile, JSON.stringify(res.profile))
}

export function isloggedIn() {
  const token = AsyncStorage.getItem(cookieItems.token)
  return false
}

export function logout() {
  Object.keys(cookieItems).map(key => AsyncStorage.removeItem(key))
}

export default {
  login,
  logout,
  isloggedIn
}
