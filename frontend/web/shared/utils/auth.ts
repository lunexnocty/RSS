import api from '../api'
import Router from 'next/router'
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

async function login(email: string, password: string) {
  const res = await api.post<LoginResponse>('/login', {
    email,
    password
  })

  setLocalStorage(cookieItems.token, res.token)
  await setProfile()
}

async function setProfile() {
  const res = await api.get<ProfileResponse>('/user')
  setLocalStorage(cookieItems.profile, JSON.stringify(res.profile))
}

export function isloggedIn() {
  const token = getLocalStorage(cookieItems.token)
  return !!token
}

export function logout() {
  Object.keys(cookieItems).map(key => localStorage.removeItem(key))
  Router.push('/login')
}

export function setLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value)
}

export function getLocalStorage(key: string): any {
  return localStorage.getItem(key)
}

export default {
  login,
  logout,
  isloggedIn,
  setLocalStorage,
  getLocalStorage
}
