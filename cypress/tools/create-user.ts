// eslint-disable-next-line filenames/match-regex
import * as dotenv from 'dotenv'
import * as firebase from 'firebase-admin'
import {getManager} from 'typeorm'
import * as os from 'os'
import getTestData from "./test-data";

dotenv.config({path: '../../.env'})

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMINSDK_SA)
console.log(`Init service account for project_id: ${serviceAccount.project_id}`)

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
})


const {phoneNumber} = process.env
const userInfo = os.userInfo()
const testData = getTestData(phoneNumber, userInfo.username)

async function createUser() {

    const displayName = `${testData.FIRST_NAME} ${testData.LAST_NAME}`

    const authUser = await firebase
        .auth()
        .createUser({
            email: testData.EMAIL,
            phoneNumber: testData.USER_PHONE_NUMBER,
            displayName,
            password: testData.E2E_PASSWORD
        })

    const db = firebase.firestore()

    const data = {
        authUserId: authUser.uid,
        base64Photo: '',
        firstName: testData.FIRST_NAME,
        lastName: testData.LAST_NAME,
        email: testData.EMAIL,
        phoneNumber: testData.USER_PHONE_NUMBER,
        organizationIds: testData.ORGANIZATION_IDS,
        isEmailVerified: testData.IS_EMAIL_VERIFIED,
        isE2E: true,
    }

    await db.collection('users').doc(testData.ID).set(data)

    const manager = getManager()
    await manager.query(`INSERT INTO patient(firebaseKey, firstName, lastName, isEmailVerified) VALUES('${testData.ID}', '${testData.FIRST_NAME}', '${testData.LAST_NAME}', ${testData.IS_EMAIL_VERIFIED}) ON DUPLICATE KEY UPDATE isEmailVerified = ${testData.IS_EMAIL_VERIFIED};`)
  const [patient] = await manager.query(`SELECT * FROM patient WHERE patient.firebaseKey='${testData.ID}' LIMIT 1`)

    await manager.query(`INSERT INTO patientAuth(patientId, authUserId, email, phoneNumber) VALUES('${patient.idPatient}', '${authUser.uid}', '${testData.EMAIL}', ${testData.USER_PHONE_NUMBER}) ON DUPLICATE KEY UPDATE patientAuth.authUserId='${authUser.uid}';`)
}

export default createUser