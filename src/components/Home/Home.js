import React, { useContext, useEffect } from 'react';
import { authContext } from '../../contexts/AuthContext';
import NoPfp from '../../assets/imgs/NoPfp.svg';
import './Home.css';

const Home = () => {
  const { user } = useContext(authContext);

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-picture-wrapper">
          <img src={NoPfp} alt="Empty" className="profile-picture" />
        </div>
        <h1>{user.email}</h1>
      </div>
    </div>
  );
};

export default Home;
