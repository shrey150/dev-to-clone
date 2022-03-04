import '../styles/globals.css'
import Navbar from '../components/Navbar'
import { Toaster } from 'react-hot-toast'
import { UserContext } from '../lib/context'

function MyApp({ Component, pageProps }) {
  return (
    <UserContext.Provider value={{ user:{ photoURL: "https://static.wikia.nocookie.net/youtube/images/9/9a/RandyRonda.jpg" }, username: "shrey" }}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  )
}

export default MyApp
