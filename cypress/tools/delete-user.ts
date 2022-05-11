// eslint-disable-next-line filenames/match-regex
import * as dotenv from 'dotenv'
import * as firebase from 'firebase-admin'

dotenv.config({path: '../../.env'})

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMINSDK_SA)
console.log(`Init service account for project_id: ${serviceAccount.project_id}`)

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
})

const db = firebase.firestore()

async function deleteUser() {
  try {
    const phoneNumber = `+1${process.env.phoneNumber}`
    const firebaseUserByPhoneNumber = await firebase.auth().getUserByPhoneNumber(phoneNumber)

    if (!firebaseUserByPhoneNumber) {
      console.warn(`User with phoneNumber ${phoneNumber}`)
    }

    await firebase.auth().deleteUser(firebaseUserByPhoneNumber.uid)

    const firestoreUser = await db
      .collection('users')
      .where('authUserId', '==', firebaseUserByPhoneNumber.uid)
      .get()
    
    if (!firestoreUser.size) {
      console.warn(`User with authUserId not found ${firebaseUserByPhoneNumber.uid}`)
    }

    const deletePromises = firestoreUser.docs.map(user => user.ref.delete())
    await Promise.all(deletePromises)
  } catch (error) {
    console.log(error)
  }
}

export default deleteUser