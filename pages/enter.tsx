import { useContext } from "react"
import { UserContext } from "../lib/context"
import { auth, googleAuthProvider, signIn, signOut } from "../lib/firebase"

export default function EnterPage({ }) {

    const { user, username } = useContext(UserContext)

    // 1. user signed out       -> <SignInButton />
    //
    // 2. user signed in:
    //      a. missing username -> <UsernameForm />
    //      b. has username     -> <SignOutButton />
    
    return (
        <main>
          {user ?
            !username ? <UsernameForm /> : <SignOutButton />
            :
            <SignInButton />
          }
        </main>
    )
}

function SignInButton() {
    const signInWithGoogle = async () => {
        await signIn(auth, googleAuthProvider)
    }

    return (
        <button className="btn-google" onClick={signInWithGoogle}>
            <img src={"/google.png"} /> Sign in with Google
        </button>
    )
}

function SignOutButton() {
    return <button onClick={() => signOut(auth)}>Sign Out</button>
}

function UsernameForm() {
    return <></>
}