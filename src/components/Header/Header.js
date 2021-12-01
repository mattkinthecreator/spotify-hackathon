import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { Dropdown } from 'rsuite';
import { authContext } from '../../contexts/AuthContext';
import 'rsuite/dist/rsuite.min.css';

const Header = () => {
  const { user, handleLogOut } = useContext(authContext);

  return (
    <div className="header">
      <Dropdown title={user.email} className="rs-theme-dark">
        <Dropdown.Item>
          <Link to="/" className="profile-link">
            Мой профиль
          </Link>
        </Dropdown.Item>
        <Dropdown.Item onClick={handleLogOut}>Выйти</Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default Header;
