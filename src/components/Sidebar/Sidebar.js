import React from 'react';
import './Sidebar.css';
import FavIcon from '../../assets/imgs/spotify-fav.png';
import { BiHomeAlt } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <BiHomeAlt className="icon" />
          Главная
        </li>
        <li>
          <BsSearch className="icon" /> Поиск
        </li>
        <li>
          <img src={FavIcon} alt="fav icon" className="fav-icon" />
          Любимые треки
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
