import api from '../api'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'
import Cookie from 'js-cookie'

export type RoleID = 1 | 2 | 3;
export type ResponseStatus = 'success' | 'failed';

export const cookieItems = {
  user: 'user'
}

export type SigninFormData = {
  username: string;
  password: string;
};
export type SigninFormResponse = {
  status: ResponseStatus;
  user: User | null;
  info: string;
};

export type SignupFormData = {
  username: string;
  password: string;
  email: string;
  role_id: RoleID;
};

export type SignupFormResponse = {
  status: ResponseStatus;
  info: string;
};

export type User = {
  username: string;
  avatar: string;
  role_id: RoleID;
};

async function signin({ username, password }: SigninFormData) {
  return await api.post<SigninFormResponse>('/signin', {
    username,
    password
  })
}

async function signup(data: SignupFormData) {
  return await api.post<SignupFormResponse>('/signup', data)
}

async function setProfile(user: User) {
  Cookie.set(cookieItems.user, JSON.stringify(user))
}

export function isloggedIn() {
  const token = Cookie.get(cookieItems.user)
  return !!token
}

export function logout() {
  Cookie.remove(cookieItems.user)
  Router.replace('/login')
}

export function WithAuth({ children }: any) {
  const [loading, set] = useState(false)
  if (process.browser) {
    useEffect(() => {
      if (!isloggedIn()) {
        Router.push('/signin')
      } else {
        setTimeout(() => set(true), 200)
      }
    })
  }

  return <>{loading ? { ...children } : ''}</>
}
export default {
  signin,
  signup,
  logout,
  isloggedIn
}
