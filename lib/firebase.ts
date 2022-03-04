import { getApps, getApp, initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { getFirestore, collection, query, where, doc, onSnapshot } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCVZu8InvLg7deoaKZhaF5jZUzoRYjOBow",
    authDomain: "dev-to-clone-smp.firebaseapp.com",
    projectId: "dev-to-clone-smp",
    storageBucket: "dev-to-clone-smp.appspot.com",
    messagingSenderId: "677385271852",
    appId: "1:677385271852:web:a29d10b2e42e76effa6f89",
    measurementId: "G-YWPQ8Y9RDH"
}

if (!getApps().length) {
    initializeApp(firebaseConfig)
}

const firebaseApp = getApp()

export const auth = getAuth(firebaseApp)
export { signInWithPopup as signIn, signOut }
export const googleAuthProvider = new GoogleAuthProvider();

export const db = getFirestore(firebaseApp)
export const usersRef = collection(db, "users")
export { collection, query, where, doc, onSnapshot }

export const storage = getStorage(firebaseApp)