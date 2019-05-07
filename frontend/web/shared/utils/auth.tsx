import api from '../api'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import {roleMap,UserRole} from './role'

export type RoleID = 1 | 2 | 3;
export type ResponseStatus = 'success' | 'failed';

export const cookieItems = {
  isloggedIn: 'loggedIn',
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

export type UserResponse = {
  username: string;
  avatar: string;
  role_id: RoleID;
};

export type User = {
  name: string;
  avatar: string;
  role: UserRole;
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

function getProfile():User {
  return Cookie.getJSON(cookieItems.user) || {}
}

function setProfile(userData: UserResponse) {
  //Cookie.set(cookieItems.isloggedIn,'yes')
  const user: User = {
    name: userData.username,
    avatar: userData.avatar,
    role: roleMap[userData.role_id]
  }
  Cookie.set(cookieItems.user, user)
}

export function isloggedIn() {
  const token = Cookie.get(cookieItems.user)
  return !!token
}

export function logout() {
  Cookie.remove(cookieItems.user)
  Router.replace('/signin')
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
  setProfile,
  getProfile,
  signup,
  logout,
  isloggedIn
}
