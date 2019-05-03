import api from '../api'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
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

  Cookie.set(cookieItems.token, res.token)
  await setProfile()
  Router.push('/')
}

async function setProfile() {
  const res = await api.get<ProfileResponse>('/user')
  Cookie.set(cookieItems.profile, JSON.stringify(res.profile))
}

export function isloggedIn() {
  const token = Cookie.get(cookieItems.token)
  return !!token
}

export function logout() {
  Object.keys(cookieItems).map(key => Cookie.remove(key))
  Router.push('/login')
}

export function WithAuth({ children }: any) {
  const [loading, set] = useState(false)
  if (process.browser) {
    useEffect(() => {
      if (!isloggedIn()) {
        Router.push('/login')
      } else {
        setTimeout(() => set(true), 200)
      }
    })
  }

  return <>{loading ? { ...children } : ''}</>
}
export default {
  login,
  logout,
  isloggedIn
}
