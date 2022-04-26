// eslint-disable-next-line filenames/match-regex
import * as dotenv from 'dotenv'
import * as firebase from 'firebase-admin'
import {getManager} from 'typeorm'
import connectToMysql from './connection'

dotenv.config({path: '../../.env'})

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMINSDK_SA)
console.log(`Init service account for project_id: ${serviceAccount.project_id}`)

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
})

async function createUser() {
  try {
    const connection = await connectToMysql()

    const {phoneNumber} = process.env
    const userData = {
      firstName: 'E2E_FIRSTNAME',
      lastName: 'E2E_LASTNAME',
      email: 'test+E2E_EMAIL@stayopn.com',
      isEmailVerified: true,
      phoneNumber: `+1${phoneNumber}`,
    }
    const displayName = `${userData.firstName} ${userData.lastName}`

    const authUser = await firebase
      .auth()
      .createUser({email: userData.email, phoneNumber: userData.phoneNumber, displayName, password: 'E2E_PASSWORD'})

    const db = firebase.firestore()
    const userDocument = await db.collection('users').add({
      authUserId: authUser.uid,
      base64Photo: '',
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      organizationIds: ['PUBLIC_ORG'],
      isEmailVerified: true,
      isE2E: true,
    })

    const manager = getManager()
    await manager.query(`INSERT INTO patient(firebaseKey, firstName, lastName, isEmailVerified) VALUES('${userDocument.id}', '${userData.firstName}', '${userData.lastName}', ${userData.isEmailVerified}) ON DUPLICATE KEY UPDATE isEmailVerified = ${userData.isEmailVerified};`)

    const [patient] = await manager.query(`SELECT * FROM patient WHERE patient.firebaseKey='${userDocument.id}' LIMIT 1`)

    await manager.query(`INSERT INTO patientAuth(patientId, authUserId, email, phoneNumber) VALUES('${patient.idPatient}', '${authUser.uid}', '${userData.email}', ${userData.phoneNumber}) ON DUPLICATE KEY UPDATE patientAuth.authUserId='${authUser.uid}';`)

    await connection.close()
  } catch (error) {
    console.log(error)
  }
}

createUser()
