import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useLocation, useParams } from 'react-router'
import './Header.css'
import { Dropdown } from 'rsuite'
import { authContext } from '../../contexts/AuthContext'
import 'rsuite/dist/rsuite.min.css'
import { artistsContext } from '../../contexts/ArtistsContext'

const Header = () => {
  const { user, handleLogOut } = useContext(authContext)

  const { getSearchArtist } = useContext(artistsContext)

  const { pathname } = useLocation()

  return (
    <div className="header">
      {pathname === '/search' && (
        <div className="search-bar-wrapper">
          <input
            type="text"
            className="search-bar"
            placeholder="Исполнитель.."
            onChange={(e) => getSearchArtist(e.target.value)}
          />
        </div>
      )}
      <Dropdown title={user.email} className="rs-theme-dark">
        <Dropdown.Item>
          <Link to="/" className="profile-link">
            Мой профиль
          </Link>
        </Dropdown.Item>
        <Dropdown.Item onClick={handleLogOut}>Выйти</Dropdown.Item>
      </Dropdown>
    </div>
  )
}

export default Header
