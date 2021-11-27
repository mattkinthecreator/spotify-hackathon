import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage, ref } from 'firebase/storage'

export const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBstvfUj_jrM7i2J_zbkIDf9-uyhovLbfM',
  authDomain: 'ilimb-hackathon.firebaseapp.com',
  projectId: 'ilimb-hackathon',
  storageBucket: 'ilimb-hackathon.appspot.com',
  messagingSenderId: '251774663480',
  appId: '1:251774663480:web:58cf8d237179622201dfcd',
})

export const db = getFirestore()
export const storage = getStorage()
