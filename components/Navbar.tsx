import Link from 'next/link'
import { useContext } from 'react'
import { UserContext } from '../lib/context'
import { signOut, auth } from '../lib/firebase'

export default function Navbar({ }) {
  
  const { user, username } = useContext(UserContext)

  const signOutCallback = () => {
    signOut(auth)
  }

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/" passHref>
            <button className="btn-logo">FEED</button>
          </Link>
        </li>

        {/* if user is signed in and has a username */}
        {username && (
          <>
            <li className="push-left">
              <Link href="/admin" passHref>
                <button onClick={signOutCallback}>Sign Out</button>
              </Link>
            </li>
            <li>
              <Link href="/admin" passHref>
                <button className="btn-blue">Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`} passHref>
                <img src={user?.photoURL || "/hacker.png"} />
              </Link>
            </li>
          </>
        )}

        {/* if user is not signed in or hasn't created a username */}
        {!username && (
          <li>
            <Link href="/enter" passHref>
              <button className="btn-blue">Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}