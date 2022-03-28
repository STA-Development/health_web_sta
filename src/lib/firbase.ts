import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import Config from '@fh-health/utils/envWrapper'

const clientCredentials = {
  apiKey: Config.get('FIREBASE_API_KEY'),
  authDomain: Config.get('FIREBASE_AUTH_DOMAIN'),
  databaseURL: Config.get('FIREBASE_DATABASE_URL'),
  projectId: Config.get('FIREBASE_PROJECT_ID'),
  appId: Config.get('FIREBASE_APP_ID'),
  storageBucket: Config.get('APP_FIREBASE_STORAGEBUCKET'),
}

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials)
}

export default firebase
