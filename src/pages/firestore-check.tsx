import { getFirestore, collection, addDoc, serverTimestamp, doc, getDoc, query, where, getDocs, updateDoc, deleteDoc } from "firebase/firestore"
import { app } from "../firebase"

const FirestoreCheck = () => {

    const db = getFirestore(app)


    const writeData = async () => {
        const result = await addDoc(collection(db, 'cities'), {
            name: 'Chandigarh',
            country: 'India',
            pincode: 123456,
            timestamp: serverTimestamp()
        })
        console.log(result, 'resultresult')
    }

    const makeSubCollection = async () => {
        addDoc(collection(db, 'cities/tVRp67DdElQNB22HMSg6/sectors'), {
            name: 'Sector 1',
            pincode: 123456
        })
    }

    const getDocument = async () => {
        const ref = doc(db, 'cities', "tVRp67DdElQNB22HMSg6");
        const docSnap = await getDoc(ref)
        console.log(docSnap.data(), 'docSnap')
    }

    const getDocumnetsByQuery = async () => {
        const collectionRef = collection(db, 'users')
        const q = query(collectionRef)
        const querySnapshot = await getDocs(q)
        console.log(querySnapshot.docs.map(doc => doc.data()), 'querySnapshot', querySnapshot)

        const users = querySnapshot.docs.map(doc => ({
            id: doc.id,        // 🔹
            ...doc.data(),     // 🔹 Document fields
        }));
        console.log(users, 'users')
    }

    const updateData = async () => {
        const ref = doc(db, 'cities', "tVRp67DdElQNB22HMSg6");
        updateDoc(ref, {
            name: 'Chandigarh 23',
        })
    }

    const deleteData = async () => {
        const ref = doc(db, 'cities', "tVRp67DdElQNB22HMSg6");
        deleteDoc(ref)
    }
    return (
        <div>
            {/* <h1>Firestore Check</h1> */}
            <button onClick={writeData}>Write Data</button>
            <button onClick={makeSubCollection}>Make Sub Collection</button>
            <button onClick={getDocument}>Get Document</button>
            <button onClick={getDocumnetsByQuery}>Get Documents By Query</button>
            <button onClick={updateData}>Update Data</button>
            <button onClick={deleteData}>Delete Data</button>
        </div>
    )
}

export default FirestoreCheck