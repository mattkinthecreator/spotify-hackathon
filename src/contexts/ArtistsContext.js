import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from '@firebase/firestore';
import React, { useReducer, createContext } from 'react';
import { db } from '../helpers/fire';

const artistCollectionRef = collection(db, 'artists');

export const artistsContext = createContext();

const INIT_STATE = {
  artists: [],
  currentArtist: {},
  currentAlbum: {},
  searchArtists: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'GET_ARTISTS':
      return { ...state, artists: action.payload };
    case 'GET_SEARCH_ARTISTS':
      return { ...state, searchArtists: action.payload };
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

  const searchedArtist = async (value) => {
    if (value.length > 0) {
      let searchVal = value.toLowerCase();
      const data = await getDocs(artistCollectionRef);
      const artists = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter(
          (item) =>
            item.artist
              .toLowerCase()
              .slice(0, searchVal.length)
              .indexOf(searchVal) !== -1
        );
      dispatch({ type: 'GET_SEARCH_ARTISTS', payload: artists });
    }
  };

  const addNewAlbum = async (artist, obj) => {
    const artistRef = doc(db, 'artists', artist.id);
    let newArr = [...artist.albums, obj];
    artist.albums = newArr;
    await updateDoc(artistRef, {
      ...artist,
    });
  };

  return (
    <artistsContext.Provider
      value={{
        artists: state.artists,
        currentArtist: state.currentArtist,
        currentAlbum: state.currentAlbum,
        searchArtists: state.searchArtists,
        createArtist,
        getArtists,
        searchedArtist,
        addNewAlbum,
      }}>
      {children}
    </artistsContext.Provider>
  );
};

export default ArtistsContextProvider;
