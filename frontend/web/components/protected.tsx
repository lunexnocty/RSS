import React, { useState, useEffect, useContext } from 'react';
import { LoginContext } from '../context/login';
import Router from 'next/router';

export default function Protected({ children }: any) {
  const [loading, set] = useState(false);
  const isloggedIn = useContext(LoginContext);

  if (process.browser) {
    useEffect(() => {
      if (!isloggedIn) {
        Router.push('/signin');
      } else {
        setTimeout(() => set(true), 200);
      }
    }, [isloggedIn]);
  }

  return <>{loading && <>{children}</>}</>;
}
