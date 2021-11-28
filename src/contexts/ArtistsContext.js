import { addDoc, collection, getDocs } from '@firebase/firestore';
import React, { useReducer, createContext } from 'react';
import { db } from '../helpers/fire';

const artistCollectionRef = collection(db, 'artists');

export const artistsContext = createContext();

const INIT_STATE = {
  artists: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'GET_ARTISTS':
      return { ...state, artists: action.payload };
    default:
      return state;
  }
};

const ArtistsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const createArtist = async (obj) => {
    await addDoc(artistCollectionRef, obj);
  };

  const getArtists = async () => {
    const data = await getDocs(artistCollectionRef);
    const artists = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    dispatch({ type: 'GET_ARTISTS', payload: artists });
  };

  return (
    <artistsContext.Provider
      value={{ artists: state.artists, createArtist, getArtists }}>
      {children}
    </artistsContext.Provider>
  );
};

export default ArtistsContextProvider;
