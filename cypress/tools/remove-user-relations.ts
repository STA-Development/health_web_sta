import {firestore, initializeApp, credential} from "firebase-admin"
import {getManager, createConnection} from "typeorm"
require("dotenv").config()

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMINSDK_SA)
const code = process.env.RAPID_HOME_KIT_KODE
const phoneNumber = process.env.PHONE_NUMBER

type PatientInterface = {
  firebaseKey: string
  idPatient: number
}

let connection = {}
if (process.env.GAE_SERVICE) {
  connection = {
    host: process.env.HOST,
    extra: {
      socketPath: process.env.HOST,
    },
  }
} else {
  connection = {
    host: process.env.HOST,
    port: Number(process.env.PORT),
  }
}

createConnection({
  type: "mysql",
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  ...connection,
})
  .then((conn) => {
    console.log(`connection established`)
    main().then(() => console.log("Script Complete"))
  })
  .catch((err) => {
    console.log(`connection error`, err)
    return err
  })

initializeApp({
  credential: credential.cert(serviceAccount),
})
const database = firestore()

async function removeDataRelatedWithUser(): Promise<void> {
  const userSnapshot = await findUserByPhoneNumber(phoneNumber)
  if (!userSnapshot?.docs?.length) {
    return
  }
  await removeUserData(userSnapshot.docs[0].id, code)

  const patient = await findPatientByFirebaseKey(userSnapshot.docs[0].id)

  if (patient) {
    await removePatientData(patient.idPatient)
  }
  return
}

async function findPatientByFirebaseKey(firebaseKey: string): Promise<PatientInterface> {
  const manager = getManager()
  const patient = await manager
    .createQueryBuilder()
    .from("patient", "patient")
    .where("patient.firebaseKey = :firebaseKey", {firebaseKey})
    .getRawOne()

  if (!patient) {
    return
  }
  return patient
}

async function findUserByPhoneNumber(phoneNumber: string): Promise<any> {
  // Promise<firestore.QuerySnapshot<firestore.DocumentData>>
  const userSnapshot = await database
    .collection("users")
    .where("phoneNumber", "==", phoneNumber)
    .get()

  if (!userSnapshot || !userSnapshot.docs || !userSnapshot.docs.length) {
    return []
  }
  return userSnapshot
}

async function removeUserData(
  userId: firestore.QuerySnapshot<firestore.DocumentData>,
  code: string,
): Promise<void> {
  const collection = database.collection("pcr-test-results")

  const rapidHomeKitCodes = database.collection("rapid-home-kit-codes")
  const kitCode = await rapidHomeKitCodes.where("code", "==", code).get()
  if (kitCode && kitCode.docs[0] && kitCode.docs[0].id) {
    await rapidHomeKitCodes.doc(kitCode.docs[0].id).update({
      usedForUserIds: [],
      userIds: [],
      filterUserIds: [],
    })
  }

  const pcrTestResults = await collection.where("userId", "==", userId).get()

  const pcrTestResultPromise = pcrTestResults.docs.map((doc) => doc.ref.delete())

  const users = await database.collection("users").where("phoneNumber", "==", phoneNumber).get()

  const userPromise = users.docs.map((doc) => doc.ref.delete())
  void Promise.all([...pcrTestResultPromise, ...userPromise])
}

async function removePatientData(patientId: number): Promise<unknown> {
  const manager = getManager()
  const repos = [
    "patientAuth",
    "patientTravel",
    "patientToOrganization",
    "patientHealth",
    "patientDigitalConsent",
    "patientAdmin",
    "patientAddresses",
  ]
  const patientToDelegatesFields = ["dependantId", "delegateId"]

  const promises = repos.map((repo) => {
    return manager
      .createQueryBuilder()
      .delete()
      .from(`${repo}`, `${repo}`)
      .where(`${repo}.patientId = :patientId`, {patientId})
      .execute()
  })

  patientToDelegatesFields.map((field) => {
    promises.push(
      manager
        .createQueryBuilder()
        .delete()
        .from(`patientToDelegates`, `patientToDelegates`)
        .where(`patientToDelegates.${field} = :patientId`, {patientId})
        .execute(),
    )
  })
  await Promise.all(promises)

  await manager
    .createQueryBuilder()
    .delete()
    .from(`patient`, `patient`)
    .where(`patient.idPatient = :patientId`, {patientId})
    .execute()

  return
}

async function main() {
  try {
    console.log(`Migration Starting Time: ${new Date()}`)
    await removeDataRelatedWithUser()
    console.log(`Successfully removed`)
  } catch (error) {
    console.error("Error running migration", error)
  }
}
