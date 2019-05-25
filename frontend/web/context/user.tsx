import {createContext} from 'react';
import auth,{User} from '../shared/utils/auth';

export const userContext = createContext<User>({
  name: '',
  avatar: 'string',
  role: '普通用户'
});

export default function UserProvider({children}:any){
  const user:User = auth.getProfile();
  return (
    <userContext.Provider value={user}>
      {children}
    </userContext.Provider>
  );
}
