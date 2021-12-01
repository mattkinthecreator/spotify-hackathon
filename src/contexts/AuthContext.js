import React, { useContext, useEffect, useReducer, useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { addDoc, collection, getDocs } from '@firebase/firestore';
import { db } from '../helpers/fire';

const favoritesCollectionRef = collection(db, 'favorites');

export const authContext = React.createContext();

const auth = getAuth();

const INIT_STATE = {
  favorites: [],
  userId: '',
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'GET_FAVORITES':
      return {
        ...state,
        favorites: action.payload.favorites,
        userId: action.payload.id,
      };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const admins = 'bekievbeil@gmail.com';

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  };

  const getFavorites = async () => {
    const data = await getDocs(favoritesCollectionRef);
    const allFavorites = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const currentUserFavorites = allFavorites.filter(
      (item) => item.user === user.email
    )[0];
    console.log(currentUserFavorites);
    dispatch({ type: 'GET_ARTISTS', payload: currentUserFavorites });
  };

  const handleLogIn = () => {
    clearErrors();
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      switch (error.code) {
        case 'auth/invalid-email':
        case 'auth/user-disabled':
        case 'auth/user-not-found':
          setEmailError(error.message);
          break;
        case 'auth/wrong-password':
          setPasswordError(error.message);
          break;
        default:
          return;
      }
    });
  };

  const handleSignUp = () => {
    clearErrors();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        await addDoc(favoritesCollectionRef, {
          user: email,
          favorites: [],
        });
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            setEmailError(error.message);
            break;
          case 'auth/weak-password':
            setPasswordError(error.message);
            break;
          default:
            return;
        }
      });
  };

  const handleLogOut = () => {
    signOut(auth);
  };

  const authListener = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        clearInputs();
        setUser(user);
        if (user.email === admins) {
          setIsAdmin(true);
        }
      } else {
        setUser('');
        setIsAdmin(false);
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  useEffect(() => {
    getFavorites();
  }, [user]);

  const values = {
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
  };

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
