import React, { useContext } from 'react'
import './Sidebar.css'
import FavIcon from '../../assets/imgs/spotify-fav.png'
import { BiHomeAlt, BiUser } from 'react-icons/bi'
import { BsSearch } from 'react-icons/bs'
import { authContext } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const { isAdmin } = useContext(authContext)

  return (
    <div className="sidebar">
      <ul>
        <li>
          <BiHomeAlt className="icon" />
          <Link to="/">Главная</Link>
        </li>
        <li>
          <BsSearch className="icon" />
          <Link to="/search">Поиск</Link>
        </li>
        <li>
          <img src={FavIcon} alt="fav icon" className="fav-icon" />
          Любимые треки
        </li>
        {isAdmin ? (
          <li>
            <BiUser className="icon" />
            <Link to="/admin">Админ панель</Link>
          </li>
        ) : null}
      </ul>
    </div>
  )
}

export default Sidebar
