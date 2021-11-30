import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import { Dropdown } from 'rsuite'
import { authContext } from '../../contexts/AuthContext'
import 'rsuite/dist/rsuite.min.css'

const Header = () => {
  const { user } = useContext(authContext)

  return (
    <div className="header">
      <Dropdown title={user.email} className="rs-theme-dark">
        <Dropdown.Item>
          <Link to="/">Мой профиль</Link>
        </Dropdown.Item>
        <Dropdown.Item>Выйти</Dropdown.Item>
      </Dropdown>
    </div>
  )
}

export default Header
