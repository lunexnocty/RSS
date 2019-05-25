import {createContext,useState} from 'react'
import auth from '../shared/utils/auth'

export const LoginContext = createContext(false)

export default function LoginProvider({children}:any){
  const isloggedIn = auth.isloggedIn()

  return (
    <LoginContext.Provider value={isloggedIn}>
      {children}
    </LoginContext.Provider>
  )
}