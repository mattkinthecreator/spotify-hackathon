import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from '@firebase/firestore';
import React, { useReducer, createContext, useState } from 'react';
import { db } from '../helpers/fire';

const artistCollectionRef = collection(db, 'artists');

export const artistsContext = createContext();

const INIT_STATE = {
  artists: [],
  currentArtist: {},
  currentAlbum: {},
  songIndex: 0,
  searchedArtists: [],
  artistDetails: {},
  albumDetails: {},
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'GET_ARTISTS':
      return { ...state, artists: action.payload };
    case 'GET_SEARCH_ARTISTS':
      return { ...state, searchedArtists: action.payload };
    case 'GET_ARTIST_DETAILS':
      return { ...state, artistDetails: action.payload };
    case 'GET_ALBUM_DETAILS':
      return { ...state, albumDetails: action.payload };
    case 'SET_CURRENT_ALBUM':
      return {
        ...state,
        currentAlbum: action.payload.album,
        songIndex: action.payload.index,
        currentArtist: action.payload.artist,
      };
    default:
      return state;
  }
};

const ArtistsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const [isPlaying, setIsPlaying] = useState(false);

  const createArtist = async (obj) => {
    await addDoc(artistCollectionRef, obj);
  };

  const getArtists = async () => {
    const data = await getDocs(artistCollectionRef);
    const artists = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    dispatch({ type: 'GET_ARTISTS', payload: artists });
  };

  const getArtistDetails = async (id) => {
    const artistRef = doc(db, 'artists', id);
    const data = await getDoc(artistRef);
    const artist = data.data();
    dispatch({ type: 'GET_ARTIST_DETAILS', payload: artist });
  };

  const getAlbumDetails = async (artistId, albumId) => {
    const artistRef = doc(db, 'artists', artistId);
    const data = await getDoc(artistRef);
    const artist = data.data();
    const album = artist.albums.filter((album) => album.album === albumId)[0];
    dispatch({
      type: 'GET_ALBUM_DETAILS',
      payload: album,
    });
  };

  const getSearchArtist = async (value) => {
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

  const setCurrentAlbum = (album, index, artist) => {
    dispatch({
      type: 'SET_CURRENT_ALBUM',
      payload: { album, index, artist },
    });
  };

  return (
    <artistsContext.Provider
      value={{
        artists: state.artists,
        currentArtist: state.currentArtist,
        currentAlbum: state.currentAlbum,
        songIndex: state.songIndex,
        searchedArtists: state.searchedArtists,
        artistDetails: state.artistDetails,
        albumDetails: state.albumDetails,
        isPlaying,
        setIsPlaying,
        createArtist,
        getArtists,
        getSearchArtist,
        addNewAlbum,
        getArtistDetails,
        getAlbumDetails,
        setCurrentAlbum,
      }}>
      {children}
    </artistsContext.Provider>
  );
};

export default ArtistsContextProvider;
