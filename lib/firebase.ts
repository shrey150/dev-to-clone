import { getApp, initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth'
import { getFirestore, collection, query, where, doc, onSnapshot, getDoc, writeBatch, limit, getDocs, orderBy, DocumentSnapshot } from 'firebase/firestore'
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
export { onSnapshot }

export const storage = getStorage(firebaseApp)

/**
 * Fetches a user by their UID.
 * 
 * @param uid the UID for the user
 * @returns a document reference to the user
 */
export function getUserByUID(uid: string) {
    return doc(usersRef, uid)
}

/**
 * Gets a user by their username.
 * 
 * @param username the username for the user
 * @returns a document reference to the user
 */
export async function getUserByUsername(username: string) {
    const q = query(
        usersRef,
        where("username", "==", username),
        limit(1)
    )

    return (await getDocs(q)).docs[0]
}

/**
 * Gets the last n posts from a given user (if they exist).
 * 
 * @param userDoc the document reference for the user
 * @param numPosts the number of posts to fetch
 */
export async function getPostsFromUser(userDoc: DocumentSnapshot, numPosts: number) {

    const q = query(
        collection(getFirestore(), userDoc.ref.path, "posts"),
        where("published", "==", true),
        orderBy("createdAt", "desc"),
        limit(numPosts)
    )

    return (await getDocs(q)).docs.map(postToJSON)

}

/**
 * Converts a firestore document to JSON.
 * @param post the firestore document
 */
export function postToJSON(doc: DocumentSnapshot) {
    const data = doc.data()

    return {
        ...data,
        createdAt: data.createdAt.toMillis(),
        updatedAt: data.updatedAt.toMillis()
    }
}

/**
 * Gets the reverse-mapped document UID for a username.
 * 
 * @param username the username to reverse lookup
 * @returns the document containing the UID
 */
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
    batch.set(getUserByUID(user.uid), { username, photoURL: user.photoURL, displayName: user.displayName })
    batch.set(getUsernameDoc(username), { uid: user.uid })

    await batch.commit()
}