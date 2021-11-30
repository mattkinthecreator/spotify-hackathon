import React, { useContext, useEffect, useState } from 'react'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

export const authContext = React.createContext()

const auth = getAuth()

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [hasAccount, setHasAccount] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const admins = 'bekievbeil@gmail.com'

  const clearInputs = () => {
    setEmail('')
    setPassword('')
  }

  const clearErrors = () => {
    setEmailError('')
    setPasswordError('')
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
    createUserWithEmailAndPassword(auth, email, password).catch((error) => {
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

  useEffect(() => {
    authListener()
  }, [])

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
  }

  return <authContext.Provider value={values}>{children}</authContext.Provider>
}

export default AuthContextProvider
