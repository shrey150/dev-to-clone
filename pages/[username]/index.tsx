import { useContext } from "react"
import { UserContext } from "../../lib/context"

export default function UserProfilePage({ }) {

    const { user, username } = useContext(UserContext)

    return (
        <main>
            {username
            ? 
            <h1>{`${username}'s page`}</h1>
            :
            <p>You still need to set a username.</p>
            }
        </main>
    )
}