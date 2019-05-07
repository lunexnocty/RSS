import styled from 'styled-components'
import Link from 'next/link'
import { useReducer, useEffect ,useContext} from 'react'
import Dropdown from './dropdown'
import {LoginContext} from '../../../context/login'

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  box-shadow: 0 0 10px #aaa;
  font-size: 1.4rem;
`

const HeaderName = styled.span`
  font-size: inherit;
  padding: 0 20px;
`

type SettingsButtonWrapperProps = {
  isloggedIn: boolean;
};

const SettingsButtonWrapper = styled.div<SettingsButtonWrapperProps>`
  position: relative;
  font-size: inherit;
  display: ${props => (props.isloggedIn ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

export default function GlobalHeader() {
  const init = { showDropdown: false }
  type State = typeof init;
  type Action = 'close' | 'toggle';
 
  const reducer = (prev: State, action: Action): State => {
    switch (action) {
    case 'close':
      return { showDropdown: false }
    case 'toggle':
      return { showDropdown: !prev.showDropdown }
    }
  }
  const [state, dispatch] = useReducer(reducer, init)
  if (process.browser) {
    useEffect(() => {
      const iconRef = document.getElementById('settings')
      window.addEventListener('click', e => {        
        if (e.target !== iconRef) {
          dispatch('close')
        }
      })
    }, [])
  }

  const isLoggedIn = useContext(LoginContext)

  return (
    <HeaderWrapper>
      <Link href="/">
        <a>
          <HeaderName>放射源管理系统</HeaderName>
        </a>
      </Link>

      <SettingsButtonWrapper
        isloggedIn={isLoggedIn}
        onClick={() => dispatch('toggle')}
      >
        <i id={'settings'} className="fas fa-cogs" />
        {state.showDropdown && (
          <Dropdown />
        )}
      </SettingsButtonWrapper>
    </HeaderWrapper>
  )
}
