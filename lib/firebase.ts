import { getApp, initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth'
import { getFirestore, collection, query, where, doc, onSnapshot, getDoc, writeBatch } from 'firebase/firestore'
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

function createFirebaseApp(config) {
    try {
        return getApp();
    }
    catch {
        return initializeApp(config)
    }
}

const firebaseApp = createFirebaseApp(firebaseConfig)

export const auth = getAuth(firebaseApp)
export { signInWithPopup as signIn, signOut }
export const googleAuthProvider = new GoogleAuthProvider();

export const db = getFirestore(firebaseApp)
export const usersRef = collection(db, "users")
export const usernamesRef = collection(db, "usernames")
export { collection, query, where, doc, onSnapshot }

export function getUserDoc(uid: string) {
    return doc(usersRef, uid)
}

export function getUsernameDoc(username: string) {
    return doc(usernamesRef, username)
}

export async function doesUsernameExist(username: string) {
    const ref = doc(usernamesRef, username)
    return (await getDoc(ref)).exists()
} 

export async function updateUserData(user: User,  username: string) {
    
    const batch = writeBatch(db)

    // update user data and reverse mapping for username
    batch.set(getUserDoc(user.uid), { username, photoURL: user.photoURL, displayName: user.displayName })
    batch.set(getUsernameDoc(username), { uid: user.uid })

    await batch.commit()
}

export const storage = getStorage(firebaseApp)