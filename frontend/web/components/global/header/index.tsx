import styled from 'styled-components'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import role from '../../../shared/utils/role'
import Dropdown from './dropdown'

const HeaderWrapper = styled.header`
  display: flex;
  background-color: #eee;
  justify-content: space-between;
  padding: 5px;
  box-shadow: 0 0 10px #aaa;
`
const HeaderName = styled.span`
  font-size: 2rem;
  padding: 0 20px;
`

const SettingsButtonWrapper = styled.div`
  position: relative;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`
export default function GlobalHeader() {
  const [showDropdown, set] = useState(false)
  const rolename = role.get()

  if (process.browser) {
    const iconRef = document.getElementById('settings')
    useEffect(() => {
      window.addEventListener('click', e => {
        if (e.target !== iconRef) {
          set(false)
        }
      })
    }, [])
  }

  return (
    <HeaderWrapper>
      <Link href="/">
        <a>
          <HeaderName>放射源管理系统</HeaderName>
        </a>
      </Link>
      <SettingsButtonWrapper>
        <i
          id={'settings'}
          onClick={() => set(!showDropdown)}
          className="fas fa-cogs"
        />
        {showDropdown && <Dropdown username={'用户名'} role={rolename} />}
      </SettingsButtonWrapper>
    </HeaderWrapper>
  )
}
