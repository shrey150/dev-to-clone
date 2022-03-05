import { useContext, useEffect, useState, useCallback } from "react"
import { UserContext } from "../lib/context"
import { auth, doesUsernameExist, googleAuthProvider, signIn, signOut, updateUserData } from "../lib/firebase"
import debounce from "lodash.debounce"

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
    const [formValue, setFormValue] = useState("")
    const [isValid, setIsValid] = useState(false)
    const [loading, setLoading] = useState(false)

    const { user, username } = useContext(UserContext)

    // each time the input text is updated, check if it already exists
    useEffect(() => {
        checkUsername(formValue)
    }, [formValue])

    const onChange = (e) => {

        // force only lowercase letters in form input
        const val = e.target.value.toLowerCase()
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

        // update input text for the first few characters (it won't be valid though)
        if (val.length < 3) {
            setFormValue(val)
            setLoading(false)
            setIsValid(false)
        }

        // update input text if all characters are valid
        if (re.test(val)) {
            setFormValue(val)
            setLoading(true)
            setIsValid(false)
        }

    }

    const checkUsername = useCallback(
        debounce(async (username) => {
            // only continue checking if it's long enough
            // (this prevents against slow DB calls for invalid usernames)
            if (username.length >= 3) {
                const exists = await doesUsernameExist(username)
                console.log("Firestore read executed for checkUsername()")
                setIsValid(!exists)
                setLoading(false)
            }
        }, 500),
        []
    )

    const onSubmit = async (e) => {
        e.preventDefault()
        updateUserData(user, formValue)
    }

    return (
        !username && (
            <section>
                <h3>Choose Username</h3>
                <form onSubmit={onSubmit}>
                    <input name="username" placeholder="username" value={formValue} onChange={onChange} />

                    <UsernameMessage username={formValue} isValid={isValid} loading={loading} />

                    <button type="submit" className="btn-green" disabled={!isValid}>
                        Choose
                    </button>

                    <h3>Debug State</h3>
                    <div>
                        Username: {formValue}
                        <br />
                        Loading: {loading.toString()}
                        <br />
                        Username Valid: {isValid.toString()}
                    </div>
                </form>
            </section>
        )
    )
}

function UsernameMessage({ username, isValid, loading }) {
    if (loading) {
        return <p>Checking...</p>
    }
    else if (isValid) {
        return <p className="text-success">{username} is available!</p>
    }
    else if (username && !isValid) {
        return <p className="text-danger">That username is taken.</p>
    }
    else {
        return <p></p>
    }
}