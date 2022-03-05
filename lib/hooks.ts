import { auth, doc, usersRef, onSnapshot, collection, db } from '../lib/firebase'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

export function useUserData() {
    const [user] = useAuthState(auth)
    const [username, setUsername] = useState(null)
  
    // runs each time component is updated
    useEffect(() => {
  
      // callback function returned by Firebase,
      // allows us to unsubscribe from realtime updates
      let unsubscribe;
  
      // if logged in
      if (user) {
        // get reference to user's document
        const ref = doc(usersRef, user.uid)
  
        // when user data is updated, update "username" state (if it exists)
        unsubscribe = onSnapshot(ref, (doc) => {
          setUsername(doc.data()?.username)
        })
      }
      // if not logged in
      else {
        console.log("Nope not logged in")
        setUsername(null)
      }
  
      return unsubscribe
  
    // this hook depends on "user" state
    }, [user])

    return { user, username }
}