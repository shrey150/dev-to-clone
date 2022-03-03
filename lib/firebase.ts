import { getApps, getApp, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
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
export const firestore = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)