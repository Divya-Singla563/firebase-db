
import './App.css'
import { getDatabase, ref, set } from 'firebase/database'
import { app } from './firebase.ts'
import SignUp from './pages/signup.tsx'
import Login from './pages/login.tsx'

function App() {

  const db = getDatabase(app)

  const putData = () => {
    set(ref(db, 'users/divya'), {
      id: 1,
      name: 'Divya Singlaaa',
      ag: 24
    })
  }



  return (
    <>
      {/* <h1>Firebase Realtime Database</h1> */}
      <button onClick={putData}>Put Data</button>
      {/* <SignUp /> */}
      <Login />
    </>
  )
}

export default App
