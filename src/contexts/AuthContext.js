import React, { useContext, useEffect, useReducer, useState } from 'react'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from '@firebase/firestore'
import { db } from '../helpers/fire'

const favoritesCollectionRef = collection(db, 'favorites')

export const authContext = React.createContext()

const auth = getAuth()

const INIT_STATE = {
  favorites: [],
}

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'GET_FAVORITES':
      return {
        ...state,
        favorites: action.payload.favorites,
      }
    default:
      return state
  }
}

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [hasAccount, setHasAccount] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [favorites, setFavorites] = useState({})
  const [userId, setUserId] = useState('')

  const admins = 'bekievbeil@gmail.com'

  const clearInputs = () => {
    setEmail('')
    setPassword('')
  }

  const clearErrors = () => {
    setEmailError('')
    setPasswordError('')
  }

  const getFavorites = async () => {
    const data = await getDocs(favoritesCollectionRef)
    const allFavorites = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    const currentUserFavorites = allFavorites.filter(
      (item) => item.user === user.email
    )[0]
    if (currentUserFavorites) {
      setUserId(currentUserFavorites.id)
      setFavorites(currentUserFavorites.favorites)
    }
  }

  const handleLogIn = () => {
    clearErrors()
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      switch (error.code) {
        case 'auth/invalid-email':
        case 'auth/user-disabled':
        case 'auth/user-not-found':
          setEmailError(error.message)
          break
        case 'auth/wrong-password':
          setPasswordError(error.message)
          break
        default:
          return
      }
    })
  }

  const handleSignUp = () => {
    clearErrors()
    createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        await addDoc(favoritesCollectionRef, {
          user: email,
          favorites: {
            songs: [],
          },
        })
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            setEmailError(error.message)
            break
          case 'auth/weak-password':
            setPasswordError(error.message)
            break
          default:
            return
        }
      })
  }

  const handleLogOut = () => {
    signOut(auth)
  }

  const authListener = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        clearInputs()
        setUser(user)
        if (user.email === admins) {
          setIsAdmin(true)
        }
      } else {
        setUser('')
        setIsAdmin(false)
      }
    })
  }

  const toggleFavorite = async (song, albumCover, artist) => {
    const userRef = doc(db, 'favorites', userId)
    let newFavorites = { ...favorites }
    let obj = {
      ...song,
      album_cover: albumCover,
      artist: artist.artist,
    }
    if (
      favorites.songs &&
      newFavorites.songs.some((item) => item.song_title === obj.song_title)
    ) {
      newFavorites.songs = favorites.songs.filter(
        (item) => item.song_title !== obj.song_title
      )
    } else {
      newFavorites.songs.push(obj)
    }
    await updateDoc(userRef, { favorites: newFavorites })
    getFavorites()
  }

  useEffect(() => {
    authListener()
  }, [])

  useEffect(() => {
    getFavorites()
  }, [user])

  const values = {
    favorites,
    email,
    user,
    password,
    handleLogOut,
    handleLogIn,
    handleSignUp,
    setEmail,
    setPassword,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
    isAdmin,
    toggleFavorite,
  }

  return <authContext.Provider value={values}>{children}</authContext.Provider>
}

export default AuthContextProvider
