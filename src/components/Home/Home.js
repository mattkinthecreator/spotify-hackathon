import React, { useContext, useEffect } from 'react';
import { artistsContext } from '../../contexts/ArtistsContext';
import Content from '../Content/Content';
import Header from '../Header/Header';
import Player from '../Player/Player';
import Sidebar from '../Sidebar/Sidebar';

const Home = () => {
  const { artists, getArtists } = useContext(artistsContext);

  useEffect(() => {
    getArtists();
  }, []);

  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Header />
        <Content />
        {artists[0] && (
          <Player
            songs={artists[0].albums[0].songs}
            cover={artists[0].albums[0].album_cover}
            artist={artists[0].artist}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
