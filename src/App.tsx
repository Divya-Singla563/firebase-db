
import './App.css'
import { getDatabase, ref, set } from 'firebase/database'
import { app } from './firebase.ts'
import SignUp from './pages/signup.tsx'
import Login from './pages/login.tsx'
import { useEffect } from 'react'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import FirestoreCheck from './pages/firestore-check.tsx'

function App() {

  const db = getDatabase(app)

  const putData = () => {
    set(ref(db, 'users/divya'), {
      id: 1,
      name: 'Divya Singlaaa',
      ag: 24
    })
  }

  const auth = getAuth(app)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uid, 'userr', user)
      } else {
        console.log('user is logged out')
      }
    })
  }, [])

  return (
    <>
      <FirestoreCheck />
      {/* <h1>Firebase Realtime Database</h1> */}
      <button onClick={putData}>Put Data</button>
      <SignUp />
      <Login />
      <button onClick={() => signOut(auth)}>Log out</button>

    </>
  )
}

export default App
