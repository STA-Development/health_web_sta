import {firestore} from 'firebase-admin'
import * as os from 'os'
import getTestData from '../test-data'
// Here rule is disabled because it is not under our root
// eslint-disable-next-line import/no-relative-packages
import getUniqKey from '../../helpers/uniqKeyUtil'

const userInfo = os.userInfo()

const {phoneNumber} = process.env

const testData = getTestData(phoneNumber, userInfo.username, getUniqKey(userInfo.gid))

const database = firestore()
const collectionName = 'appointments'

const createAppointment = async (
  dataOverwrite: {
    id: string
    dateTime: string
    dateOfAppointment: string
    organizationId?: string
    appointmentStatus?: string
    labId?: string
    testType?: string
    userId?: string
    barCode?: string
    testRunId?: string
    deadline?: string
    appointmentTypeID?: number
    calendarId?: number
    clinicOrganization?: string
    usAppointment: boolean
  },
  testDataCreator: string,
): Promise<FirebaseFirestore.WriteResult> => {
  const data = {
    id: dataOverwrite.id,
    acuityAppointmentId: 111,
    isE2e: true,
    address: 'address',
    addressUnit: 'addressUnit',
    agreeToConductFHHealthAssessment: true,
    appointmentStatus: dataOverwrite.appointmentStatus ?? 'Pending',
    appointmentTypeID: dataOverwrite.appointmentTypeID ? dataOverwrite.appointmentTypeID : 111,
    barCode: dataOverwrite.barCode ? dataOverwrite.barCode : null,
    calendarID: dataOverwrite.calendarId ? dataOverwrite.calendarId : 1,
    canceled: false,
    dateOfAppointment: dataOverwrite.dateOfAppointment,
    dateOfBirth: 'February 3, 2021',
    dateTime: firestore.Timestamp.fromDate(new Date(dataOverwrite.dateTime)),
    deadline: dataOverwrite.deadline
      ? firestore.Timestamp.fromDate(new Date(dataOverwrite.deadline))
      : firestore.Timestamp.fromDate(new Date('2021-11-15T23:59:00')),
    email: 'stayopndev@gmail.com',
    firstName: 'Ruslan',
    lastName: 'TestLNAME',
    latestResult: 'Pending',
    location: 'Toronto',
    organizationId: dataOverwrite.organizationId ?? null,
    packageCode: 'TestPackageCode',
    phone: '21271782178',
    readTermsAndConditions: true,
    receiveNotificationsFromGov: true,
    receiveResultsViaEmail: true,
    registeredNursePractitioner: 'NAME registeredNursePractitioner',
    shareTestResultWithEmployer: true,
    agreeCancellationRefund: true,
    hadCovidConfirmedOrSymptoms: false,
    hadCovidConfirmedOrSymptomsDate: '',
    hadCovidExposer: false,
    hadCovidExposerDate: '',
    timeOfAppointment: '8:00am',
    testRunId: dataOverwrite.testRunId ?? null,
    labId: dataOverwrite.labId ?? null,
    userId: dataOverwrite.userId ?? 'TestUser',
    testType: dataOverwrite.testType ?? 'PCR',
    clinicOrganization: dataOverwrite.clinicOrganization ?? testData.CLINIC_ORG,
    usAppointment: dataOverwrite.usAppointment ? dataOverwrite.usAppointment : false,
    testDataCreator,
  }

  return database.collection(collectionName).doc(dataOverwrite.id).set(data)
}

export default createAppointment
