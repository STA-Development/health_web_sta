import {firestore} from 'firebase-admin'
import * as os from 'os'
import moment from 'moment-timezone'
import getTestData from "./test-data";

const userInfo = os.userInfo()
const {phoneNumber} = process.env
const testData = getTestData(phoneNumber, userInfo.username)
const database = firestore()
const collectionName = 'pcr-test-results'

export const createPCRTestResult = async (
    dataOverwrite: {
        dateTime: string
        deadline: string
        id?: string
        appointmentId?: string
        appointmentStatus?: string
        firstName?: string
        organizationId?: string
        result?: string
        displayInResult?: boolean
        testType?: string
        labId?: string
        userId?: string
        barCode?: string
        clinicOrganization?: string
        resultMetaData?: Record<string, string>
        resultAnalysis?: Record<string, string>[]
        waitingResult?: boolean
    },
    testDataCreator: string,
): Promise<
    | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
    | FirebaseFirestore.WriteResult
    > => {
    const data = {
        userId: dataOverwrite.userId ?? testData.USER_ID,
        adminId: 'TEST',
        appointmentId: dataOverwrite.appointmentId ?? testData.DEFAULT_APPOINTMENT_ID,
        appointmentStatus: dataOverwrite.appointmentStatus ?? 'Reported',
        barCode: dataOverwrite.barCode ?? 'BAR1',
        clinicOrganization: dataOverwrite.clinicOrganization ?? 'FH_CA',
        confirmed: false,
        dateTime: firestore.Timestamp.fromDate(new Date(dataOverwrite.dateTime)),
        deadline: firestore.Timestamp.fromDate(new Date(dataOverwrite.deadline)),
        dateOfAppointment: getFirestoreTimeStampDate(
            firestore.Timestamp.fromDate(new Date(dataOverwrite.dateTime)),
        ),
        deadlineDate: getFirestoreTimeStampDate(
            firestore.Timestamp.fromDate(new Date(dataOverwrite.deadline)),
        ),
        displayInResult: dataOverwrite.displayInResult ?? true,
        firstName: testData.FIRST_NAME,
        lastName: testData.LAST_NAME,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        linkedBarCodes: [],
        organizationId: dataOverwrite.organizationId ?? null,
        previousResult: null,
        result: dataOverwrite.result ?? 'Negative',
        runNumber: 1,
        reCollectNumber: 0,
        waitingResult: dataOverwrite.waitingResult ?? true,
        recollected: false,
        testType: dataOverwrite.testType ?? 'RT-PCR',
        labId: dataOverwrite.labId || null,
        sortOrder: 1,
        testDataCreator,
        updatedAt: firestore.Timestamp.fromDate(new Date()),
    }

    if (dataOverwrite.resultMetaData) {
        /* eslint-disable @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        data.resultMetaData = dataOverwrite.resultMetaData
        // @ts-ignore
        data.resultAnalysis = dataOverwrite.resultAnalysis
        /* eslint-enable @typescript-eslint/ban-ts-comment */
    }


    if (dataOverwrite.id) {
        return database.collection(collectionName).doc(dataOverwrite.id).set(data)
    }
        return database.collection(collectionName).add(data)
}
const getFirestoreTimeStampDate = (datetime: firestore.Timestamp): firestore.Timestamp => firestore.Timestamp.fromDate(
        moment(datetime.toDate())
            .tz('America/Toronto')
            .set({
                hour: 0,
                minute: 0,
                second: 0,
                millisecond: 0,
            })
            .utc(true)
            .toDate(),
    )

export const deletePCRTestResultByUserId = async (userId: string): Promise<void> => {
    const appointmentsQuery = database
        .collection(collectionName)
        .where('userId', '==', userId)
    await appointmentsQuery.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            doc.ref.delete()
        })
    })
}