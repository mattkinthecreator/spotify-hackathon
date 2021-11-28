import React, { useContext, useState } from 'react';
import useSound from 'use-sound';
import { artistsContext } from '../../contexts/ArtistsContext';

const Home = () => {
  const { artists } = useContext(artistsContext);

  console.log(artists);

  return <div></div>;
};

export default Home;
