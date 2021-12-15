import firebase from 'firebase/compat/app'
import 'firebase/auth'
import 'firebase/firestore'

const clientCredentials = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID,
  storageBucket: process.env.APP_FIREBASE_STORAGEBUCKET,
}

if (!firebase.apps.length) {
  console.error(clientCredentials)
  firebase.initializeApp(clientCredentials)
}

export default firebase
